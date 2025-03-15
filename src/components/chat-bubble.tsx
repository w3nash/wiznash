"use client";

import { cn } from "@/lib/utils";
import { Clock, LoaderCircle } from "lucide-react";
import { formatMessageTime } from "@/lib/format-time";
import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { Badge } from "./ui/badge";
import hljs from "highlight.js";

interface ChatBubbleProps {
  content: string;
  timestamp?: Date;
  isUser: boolean;
  className?: string;
}

export function ChatBubble({
  content,
  timestamp,
  isUser,
  className,
}: ChatBubbleProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect
  useEffect(() => {
    hljs.highlightAll();
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);
  let modifiedContent = <Markdown>{content}</Markdown>;

  if (!isUser) {
    modifiedContent = (
      <Badge>
        <LoaderCircle className='animate-spin' /> Thinking...
      </Badge>
    );

    if (content.includes("</think>")) {
      modifiedContent = (
        <Markdown>
          {content.replace(/^[\s\S]*<\/think>(?![\s\S]*<\/think>)/g, "")}
        </Markdown>
      );
    }
  }

  return (
    <div
      className={cn(
        "relative max-w-[85%] group",
        isUser ? "ml-auto" : "mr-auto",
        isVisible ? "bubble-in" : "opacity-0",
        className
      )}
      aria-label={`${isUser ? "Your message" : "Assistant message"}`}
    >
      {/* Main bubble */}
      <div
        className={cn(
          "rounded-2xl px-4 py-3 relative transition-colors duration-300 shadow-md hover:shadow-lg border border-border/20 text-primary-foreground",
          isUser ? "bg-primary" : "bg-muted text-primary"
        )}
      >
        {/* Bubble tail/arrow */}
        <div
          className={cn(
            "absolute top-3 w-4 h-4 overflow-hidden",
            isUser ? "-right-4" : "-left-4"
          )}
        >
          <div
            className={cn(
              "absolute transform rotate-45 w-2 h-2",
              isUser
                ? "bg-primary -left-1 top-1"
                : "bg-muted/90 border-l border-t border-border -right-1 top-1"
            )}
          />
        </div>

        {/* Message content with improved typography and special styles for links, lists, and code */}
        <div
          className={cn(
            "whitespace-pre-wrap text-base leading-relaxed font-medium bubble-content",
            isUser ? "text-[15px]" : "text-[15px]"
          )}
        >
          {modifiedContent}
        </div>

        {/* Timestamp with improved visibility */}
        {timestamp && (
          <div
            className={cn(
              "flex items-center text-xs mt-2 gap-1",
              isUser ? "text-primary-foreground/80" : "text-foreground/60",
              "border-t pt-1 mt-2",
              isUser ? "border-primary-foreground/20" : "border-border"
            )}
            aria-label='Message sent time'
          >
            <Clock className='h-3 w-3' />
            <span>{formatMessageTime(timestamp)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
