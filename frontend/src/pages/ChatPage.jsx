import React from "react";
import Button from "../components/Button";
import useAuthStore from "../store/useAuthStore";

const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default ChatPage;
