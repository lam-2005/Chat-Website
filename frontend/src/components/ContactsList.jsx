import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import useAuthStore from "../store/useAuthStore";

const ContactsList = () => {
  const {
    getAllContacts,
    allContacts,
    isUserLoading,
    setSelectedUser,
    selectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);
  if (isUserLoading) return <UsersLoadingSkeleton />;
  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className={`bg-pink-500/10 p-2 rounded-lg cursor-pointer hover:bg-pink-500/20 transition-colors ${
            selectedUser && selectedUser._id === contact._id
              ? "bg-pink-500/20"
              : ""
          }`}
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers.includes(contact._id)
                  ? "avatar-online"
                  : "avatar-offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.userName}
                />
              </div>
            </div>
            <h4 className=" font-medium truncate">{contact.userName}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactsList;
