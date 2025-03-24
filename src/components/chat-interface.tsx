"use client";

import { useState, useEffect } from "react";
import type { UseChatHelpers } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatBubble } from "@/components/chat-bubble";
import { SendIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/user-profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import WizardAvatar from "@/components/wizard-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatInterface({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  status,
  setMessages,
}: UseChatHelpers) {
  const [mounted, setMounted] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
  });
  const [showClearDialog, setShowClearDialog] = useState(false);

  // Load user profile
  useEffect(() => {
    setUserProfile({
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
  }, []);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle clearing chat history
  const handleClearChat = () => {
    setShowClearDialog(true);
  };

  const confirmClearChat = () => {
    setMessages([]);
    setShowClearDialog(false);
  };

  // Get user initials for avatar
  const getUserInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  if (!mounted) return null;

  const isEmptyChat = messages.length === 0;

  return (
    <Card className='w-full h-full flex flex-col shadow-xl shadow-primary/5 rounded-2xl'>
      <CardHeader className='py-0 px-2'>
        <CardTitle className='flex items-center gap-2'>
          <WizardAvatar size='md' />
          <span className='text-2xl font-bold'>WizNash Chat</span>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className='flex-1 flex flex-col'>
        <ScrollArea className='w-full h-[70vh]'>
          {isEmptyChat ? (
            <div className='flex flex-col items-center justify-center text-center px-4 mt-20'>
              <div className='mb-8'>
                <WizardAvatar size='lg' className='float' />
              </div>
              <h3 className='text-xl font-semibold mb-2 text-primary'>
                Welcome to <span className='font-black'>WizNash</span>!
              </h3>
              <p className='max-w-md text-base mb-4'>
                Greetings, traveler! I am WizNash, your magical companion. How
                may I assist you on your journey today?
              </p>
              <p className='text-sm text-muted-foreground max-w-md'>
                Type your message below to begin our magical conversation.
              </p>
            </div>
          ) : (
            <div className='space-y-6 py-4 pr-4 ' role='log' aria-live='polite'>
              {/* Date separator for message groups */}
              <div className='relative flex py-2 items-center my-2'>
                <div className='flex-grow border-t border-border'></div>
                <span className='flex-shrink mx-4 text-xs text-muted-foreground'>
                  {new Date().toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <div className='flex-grow border-t border-border'></div>
              </div>

              {messages.map((message, index) => {
                // Check if this is the first message or if the previous message was from a different sender
                const isNewSender =
                  index === 0 || messages[index - 1].role !== message.role;
                // Add extra spacing for new sender groups
                const topSpacing = isNewSender ? "mt-8" : "mt-4";
                const isUser = message.role === "user";

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-4 w-full",
                      isUser ? "flex-row-reverse" : "flex-row",
                      index === 0 ? "" : topSpacing
                    )}
                  >
                    {/* Sender label for screen readers */}
                    <span className='sr-only'>
                      {isUser ? "You said" : "Assistant said"}
                    </span>

                    {/* Avatar with enhanced accessibility */}
                    <div
                      className={cn(
                        "flex-shrink-0 self-start",
                        isUser ? "mt-1" : "mt-1"
                      )}
                      aria-hidden='true'
                    >
                      {isUser ? (
                        <div className='relative'>
                          <Avatar className='h-10 w-10 border-2 border-primary'>
                            <AvatarImage
                              src='https://github.com/w3nash.png'
                              alt={`${userProfile.firstName} ${userProfile.lastName}`}
                            />
                            <AvatarFallback className='bg-blue-600'>
                              {getUserInitials(
                                userProfile.firstName,
                                userProfile.lastName
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className='absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 border border-primary'></div>
                        </div>
                      ) : (
                        <WizardAvatar size='md' />
                      )}
                    </div>

                    {/* Chat bubble with improved visibility */}
                    <ChatBubble
                      content={message.content}
                      timestamp={message.createdAt}
                      isUser={isUser}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className='w-full flex py-2'>
        <form
          onSubmit={handleSubmit}
          className='w-full flex items-center gap-3'
          aria-label='Message input form'
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder='Type your message here...'
            className='flex-1 rounded-full px-6 py-4'
            disabled={status == "streaming"}
            aria-label='Message input'
            autoFocus
          />

          <Button
            type='submit'
            variant='default'
            size='icon'
            disabled={status == "streaming" || !input.trim()}
            className={cn(
              status == "streaming" && "animate-pulse",
              "shadow-lg rounded-full flex-shrink-0"
            )}
            aria-label={
              status == "streaming" ? "Sending message..." : "Send message"
            }
          >
            <SendIcon />
          </Button>
          <Button
            type='button'
            size='icon'
            onClick={handleClearChat}
            title='Clear chat history'
            aria-label='Clear chat history'
            className='rounded-full'
            disabled={messages.length == 0 || status == "streaming"}
          >
            <Trash2Icon />
          </Button>
        </form>
      </CardFooter>
      {showClearDialog && (
        <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
          <DialogContent className='rounded-2xl'>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <Separator />
              <DialogDescription>
                Are you sure you want to clear the chat history? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex justify-end gap-2 mt-4'>
              <Button
                variant='secondary'
                onClick={() => setShowClearDialog(false)}
                className='rounded-full'
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                onClick={confirmClearChat}
                className='rounded-full'
              >
                Clear History
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
