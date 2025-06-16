'use client';

import { message } from 'antd';
import { useEffect } from 'react';
import { useMessageStore } from '@/stores/messageStore';

const MESSAGE_KEY = 'global-message';

const GlobalMessageProvider = () => {
  const [messageApi, contextHolder] = message.useMessage({
    rtl: true
  });
  const { message: msg, clearMessage } = useMessageStore();

  useEffect(() => {
    if (msg) {
      messageApi.open({
        key: msg.key || MESSAGE_KEY,
        type: msg.type,
        content: msg.content,
        duration: msg.duration ?? 2,
      });

      clearMessage();
    }
  }, [msg]);

  return contextHolder;
};

export default GlobalMessageProvider;
