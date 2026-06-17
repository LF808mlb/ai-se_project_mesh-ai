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
    const title = newChatTitle.trim();
    if (!title) {
      return;
    }

    setIsCreatingChat(true);
    setChatsError(null);

    try {
      const res = await createChat(title);

      if (!res.success || !res.data) {
        throw new Error();
      }

      setChats((prev) => [res.data as ChatType, ...prev]);
      setActiveChatId(res.data._id);
      setNewChatTitle("");
    } catch {
      setChatsError("Failed to create chat.");
    } finally {
      setIsCreatingChat(false);
    }
  };

  return (
    <div>
      <h2>Chats</h2>
      {isLoadingChats && <p>Loading chats...</p>}
      {!isLoadingChats && chatsError && <p>{chatsError}</p>}
      {!isLoadingChats && !chatsError && (
        <>
          <div>
            <input
              type="text"
              value={newChatTitle}
              onChange={(event) => setNewChatTitle(event.target.value)}
              placeholder="New chat title"
            />
            <button
              type="button"
              onClick={handleCreateChat}
              disabled={isCreatingChat || !newChatTitle.trim()}
            >
              {isCreatingChat ? "Creating..." : "Create chat"}
            </button>
          </div>

          {chats.length === 0 ? (
            <p>No chats yet.</p>
          ) : (
            <ul>
              {chats.map((chat) => (
                <li key={chat._id}>
                  <button
                    type="button"
                    onClick={() => setActiveChatId(chat._id)}
                    aria-current={activeChatId === chat._id}
                  >
                    {chat.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}