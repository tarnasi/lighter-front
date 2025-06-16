import { create } from "zustand";

type MessageType = "success" | "error" | "loading" | "info" | "warning";

interface MessageData {
  key?: string;
  type: MessageType;
  content: string;
  duration?: number;
}

interface MessageState {
  message: MessageData | null;
  showMessage: (msg: MessageData) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  message: null,
  showMessage: (msg) => set({ message: msg }),
  clearMessage: () => set({ message: null }),
}));
