"use client";

import { useChat } from "@ai-sdk/react";
import ChatInterface from "@/components/chat-interface";

export default function ChatInterfaceWrapper() {
  const chatHook = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      // Ensure the message has a timestamp
      if (!message.createdAt) {
        message.createdAt = new Date();
      }
    },
  });

  return <ChatInterface {...chatHook} />;
}
