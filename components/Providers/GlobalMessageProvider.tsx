// components/GlobalMessageProvider.tsx
"use client";

import { message } from "antd";
import { useEffect } from "react";
import { useMessageStore } from "@/stores/messageStore";

const GlobalMessageProvider = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { message: msg, clearMessage } = useMessageStore();

  useEffect(() => {
    if (msg) {
      const duration = msg.duration ?? 2;
      messageApi.open({
        type: msg.type,
        content: msg.content,
        duration,
      });
      clearMessage(); // Reset so it doesn’t repeat
    }
  }, [msg]);

  return contextHolder;
};

export default GlobalMessageProvider;
