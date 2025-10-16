import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useChatStore = create((set) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
}));
export default useChatStore;
