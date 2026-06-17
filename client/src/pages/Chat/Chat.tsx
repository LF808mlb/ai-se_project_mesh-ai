import { useEffect, useState } from "react";
import { createChat, getChats, type Chat as ChatType } from "../../utils/api";
import "./Chat.css";

export default function Chat() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);
  const [isCreatingChat, setIsCreatingChat] = useState<boolean>(false);
  const [newChatTitle, setNewChatTitle] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      setIsLoadingChats(true);
      setChatsError(null);

      try {
        const res = await getChats();

        if (!res.success) {
          throw new Error();
        }

        const loadedChats = res.data ?? [];
        setChats(loadedChats);
        setActiveChatId((current) => current ?? loadedChats[0]?._id ?? null);
      } catch {
        setChatsError("Failed to load chats.");
      } finally {
        setIsLoadingChats(false);
      }
    };

    load();
  }, []);

  const handleCreateChat = async () => {
    const title = newChatTitle.trim() || "New Chat";
    setIsCreatingChat(false);
    setNewChatTitle("");

    try {
      const res = await createChat(title);

      if (res.data) {
        setChats((prev) => [res.data as ChatType, ...prev]);
        setActiveChatId(res.data._id);
      }
    } catch {
      // A toast or inline error could go here in the future.
    }
  };

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <button
          className="chat__new-btn"
          type="button"
          onClick={() => setIsCreatingChat(true)}
          disabled={isCreatingChat}
        >
          + New Chat
        </button>

        {isCreatingChat && (
          <input
            className="chat__title-input"
            type="text"
            placeholder="Chat name"
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                void handleCreateChat();
              }
              if (e.key === "Escape") {
                setIsCreatingChat(false);
                setNewChatTitle("");
              }
            }}
            autoFocus
          />
        )}

        {isLoadingChats && <p className="chat__sidebar-message">Loading...</p>}
        {chatsError && <p className="chat__sidebar-message">{chatsError}</p>}

        <ul className="chat__list">
          {chats.map((c) => (
            <li key={c._id}>
              <button
                type="button"
                className={`chat__item ${c._id === activeChatId ? "chat__item_active" : ""}`.trim()}
                onClick={() => setActiveChatId(c._id)}
              >
                {c.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="chat__main">{/* message area - coming next lesson */}</div>
    </div>
  );
}