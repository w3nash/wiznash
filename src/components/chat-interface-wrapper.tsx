"use client";

import { useChat } from "@ai-sdk/react";
import ChatInterface from "@/components/chat-interface";
import { getProfileContext, profile } from "@/lib/user-profile";

export default function ChatInterfaceWrapper() {
  const profileContext = getProfileContext();
  const chatHook = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      // Ensure the message has a timestamp
      if (!message.createdAt) {
        message.createdAt = new Date();
      }
    },
    body: {
      profile,
      profileContext,
    }
  });

  return <ChatInterface {...chatHook} />;
}
