"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface WizardAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WizardAvatar({ size = "md", className }: WizardAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <div className='flex items-center m-0'>
      <div
        className={cn(
          "relative inline-flex flex-col justify-center items-center",
          className
        )}
      >
        <div className='h-20 z-10 -my-8 flex justify-center'>
          <svg
            viewBox='0 0 36 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='h-5/6 w-5/6'
          >
            {/* Simplified wizard hat */}
            <ellipse
              cx='18'
              cy='28'
              rx='12'
              ry='3'
              opacity='0.7'
              className='fill-blue-600'
            />
            <path d='M12,28 Q18,8 24,28' className='fill-blue-600' />
            <path
              d='M11,26 Q18,24 25,26'
              className='stroke-yellow-600'
              strokeWidth='1.5'
              fill='none'
            />
          </svg>
        </div>
        <Avatar className={cn(sizeClasses[size], "border-2 shadow-sm")}>
          <AvatarImage
            src='./avatar.jpeg'
            alt='Wizard Avatar'
          />
          <AvatarFallback>WN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default WizardAvatar;
