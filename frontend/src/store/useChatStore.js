import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useChatStore = create((set) => ({
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
}));
export default useChatStore;
