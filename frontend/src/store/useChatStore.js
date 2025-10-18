import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  isUserLoading: false,
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  activeTab: "chats",
  setActiveTab: (tab) => set({ activeTab: tab }),

  allContacts: [],
  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isUserLoading: false });
    }
  },

  chats: [],
  getMyChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isUserLoading: false });
    }
  },

  messages: [],
  isMessagesLoading: false,
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimistisMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: data.text,
      image: data.image,
      icon: data.icon,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };
    set({ messages: [...messages, optimistisMessage] });
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      set({ messages });

      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;
    const { socket } = useAuthStore.getState();
    if (!socket || !socket.connected) {
      console.warn("Socket not ready yet — skipping subscription");
      return;
    }
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });
    });
  },
  unSubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
export default useChatStore;
