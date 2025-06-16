import { create } from "zustand";

type MessageType = "success" | "error" | "loading" | "info" | "warning";

interface MessageData {
  type: MessageType;
  content: string;
  duration?: number;
}

interface MessageObject {
  message: MessageData | null;
  showMessage: (msg: MessageData) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageObject>((set) => ({
  message: null,
  showMessage: (msg: MessageData) => set({ message: msg }),
  clearMessage: () => set({ message: null })
}));
