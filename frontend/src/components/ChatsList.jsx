import React, { useEffect } from "react";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import useChatStore from "../store/useChatStore";
import NoChat from "./NoChat";
import useAuthStore from "../store/useAuthStore";

const ChatsList = () => {
  const {
    getMyChatPartners,
    chats,
    isUserLoading,
    setSelectedUser,
    selectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);
  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChat />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`bg-pink-500/10 p-2 rounded-lg cursor-pointer hover:bg-pink-500/20 transition-colors ${
            selectedUser && selectedUser._id === chat._id
              ? "bg-pink-500/20"
              : ""
          }`}
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers.includes(chat._id)
                  ? "avatar-online"
                  : "avatar-offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.userName}
                />
              </div>
            </div>
            <h4 className="font-medium truncate">{chat.userName}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatsList;
