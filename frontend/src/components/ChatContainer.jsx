import React from "react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";

const ChatContainer = () => {
  const { messages, isMessagesLoading, getMessagesByUserId, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = React.useRef(null);

  React.useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  React.useEffect(() => {
    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-5 overflow-y-auto py-8 bg-[#EBECF0]">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                {msg.senderId !== authUser._id && (
                  <div className="chat-image avatar avatar-online">
                    <div className="w-10 rounded-full">
                      <img
                        alt={selectedUser.useName}
                        src={selectedUser.profilePic || "/avatar.png"}
                      />
                    </div>
                  </div>
                )}
                <div className="chat-header">
                  {msg.senderId === authUser._id
                    ? "You"
                    : selectedUser.userName}
                  <time className="text-xs opacity-50">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
                <div
                  className={`
                  chat-bubble text-white relative
                  ${
                    (msg.icon || msg.image) && !msg.text
                      ? "bg-transparent"
                      : msg.senderId === authUser._id
                      ? "bg-pink-400"
                      : "bg-white text-black!"
                  }
                  `}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  {msg.icon && (
                    <div
                      className="text-[40px] [&>svg]:w-10 [&>svg]:h-10 hover:animate-jump hover:animate-infinite animate-delay-1000"
                      dangerouslySetInnerHTML={{ __html: msg.icon }}
                    />
                  )}
                </div>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
