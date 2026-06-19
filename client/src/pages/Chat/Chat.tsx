import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import {
  createChat,
  getChat,
  getChats,
  type Chat as ChatType,
  type Message,
} from "../../utils/api";
import chatArrow from "../../assets/chat-arrow.png";
import errorImage from "../../assets/errorimage.png";
import "./Chat.css";

export default function Chat() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);
  const [isCreatingChat, setIsCreatingChat] = useState<boolean>(false);
  const [newChatTitle, setNewChatTitle] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [messagesError, setMessagesError] = useState<string>("");

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
      } catch {
        setChatsError("Failed to load chats.");
      } finally {
        setIsLoadingChats(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!activeChatId) return;

    const load = async () => {
      const chatId = activeChatId;
      if (!chatId) return;

      setMessages([]);
      setIsLoadingMessages(true);
      setMessagesError("");
      try {
        const res = await getChat(chatId);
        setMessages(res.data?.messages || []);
      } catch {
        setMessagesError("Looks like something went wrong. Try reloading the page or creating the chat again.");
      } finally {
        setIsLoadingMessages(false);
      }
    };

    load();
  }, [activeChatId]);


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

      <div className="chat__main">
        {!messagesError && !isLoadingMessages && !activeChatId && (
          <div className="chat__no-messages chat__no-messages_initial">
            <p className="chat__no-messages-title">
              Create a new chat or select an existing chat to start the conversation
            </p>
            <button
              className="chat__new-btn chat__new-btn_main"
              type="button"
              onClick={() => setIsCreatingChat(true)}
            >
              Start New Chat
            </button>
          </div>
        )}

        {!messagesError && !isLoadingMessages && activeChatId && messages.length === 0 && (
          <div className="chat__no-messages chat__no-messages_initial">
            <p className="chat__no-messages-title">
              Ask a question below to start the conversation
            </p>
            <div className="chat__ask-box">
              <span>Ask any question</span>
              <img className="chat__ask-arrow" src={chatArrow} alt="Send" />
            </div>
          </div>
        )}

        {activeChatId && isLoadingMessages && (
          <div className="chat__loading">
            <p className="chat__loading-text">Loading...</p>
          </div>
        )}

        {activeChatId && messagesError && (
          <div className="chat__error chat__error_container">
            <img className="chat__error-image" src={errorImage} alt="Error" />
            <p className="chat__error-title">Looks like something went wrong</p>
            <p className="chat__error-subtitle">Try reloading the page or creating the chat again</p>
            <button
              className="chat__new-btn chat__error-btn"
              type="button"
              onClick={() => navigate("/")}
            >
              Go to the Main Page
            </button>
          </div>
        )}

        {activeChatId && !isLoadingMessages && !messagesError && messages.length > 0 && (
          <>
            {/* messages */}
            <ul className="chat__messages">
              {messages.map((msg) => (
                <li
                  key={msg._id}
                  className={
                    msg.role === "user"
                      ? "chat__message chat__message_user"
                      : "chat__message chat__message_assistant"
                  }
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </li>
              ))}
            </ul>

            <div className="chat__input-bar">
              <textarea
                className="chat__input"
                placeholder="Ask any question"

                rows={1}
              />
              <button
                type="button"
                className="chat__send"
                aria-label="Send message"
              >
                <img className="chat__send-arrow" src={chatArrow} alt="Send" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}