"use client";

import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="h-20 bg-[#111714] px-8 flex items-center justify-between">
      {/* Left: Breadcrumbs or Page Title (Empty for now as per image) */}
      <div className="w-1/3">
        {/* Placeholder for future breadcrumbs */}
      </div>

      {/* Right: User & Actions */}
      <div className="flex items-center gap-4">
         {/* Location Button */}
         <div className="flex items-center px-4 py-2 rounded-full bg-[#1F2926] border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-emerald-400 text-sm font-medium cursor-pointer hover:bg-[#25332f] hover:border-emerald-400 transition-all group">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-4 w-4 mr-2 text-emerald-400"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            La soledad
            <ChevronDown className="h-4 w-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
         </div>
         
         {/* Profile Photo */}
         <div className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden border-2 border-[#111714] ring-2 ring-emerald-500 relative cursor-pointer hover:ring-emerald-400 transition-all">
            <img 
               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
               alt="User" 
               className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-[#111714]"></div>
         </div>
      </div>
    </header>
  );
}
