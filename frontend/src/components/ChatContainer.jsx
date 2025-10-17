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
  React.useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);
  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-5 overflow-y-auto py-8">
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
                    {new Date(msg.createdAt).toISOString().slice(11, 16)}
                  </time>
                </div>
                <div className="chat-bubble bg-pink-500 text-white m-0">
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                </div>
              </div>
            ))}
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
