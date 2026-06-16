"use client";

import React from "react";

interface PhoneMockupProps {
  children: React.ReactNode;
  maxHeightClass?: string;
  maxWidthClass?: string;
  bezelClass?: string;
  roundedClass?: string;
  borderWidthClass?: string;
  screenPaddingClass?: string;
}

export function PhoneMockup({
  children,
  maxHeightClass = "h-[500px]",
  maxWidthClass = "max-w-[300px]",
  bezelClass = "w-20 h-5.5",
  roundedClass = "rounded-[3.2rem]",
  borderWidthClass = "border-[8px]",
  screenPaddingClass = "px-4 pb-4 flex flex-col gap-4",
}: PhoneMockupProps) {
  return (
    <div 
      className={`w-full ${maxWidthClass} ${maxHeightClass} ${roundedClass} ${borderWidthClass} border-zinc-900 bg-[#f9fafb] shadow-2xl relative flex flex-col overflow-hidden`}
    >
      
      <div className={`absolute top-3.5 left-1/2 -translate-x-1/2 ${bezelClass} bg-zinc-900 rounded-full z-30 flex items-center justify-between px-1.5 pointer-events-none`}>
        <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
        <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
      </div>

      
      <div className="w-full flex items-center justify-between px-7 pt-4.5 pb-2 text-[0.68rem] font-semibold text-zinc-950 z-20 relative select-none pointer-events-none">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      
      <div className={`flex-1 overflow-y-auto scrollbar-none z-10 relative ${screenPaddingClass}`}>
        {children}
      </div>

      
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#5c43fd]/8 to-transparent pointer-events-none z-0" />
    </div>
  );
}

export default PhoneMockup;
