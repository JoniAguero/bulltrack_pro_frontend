"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Header() {
  return (
    <header className="h-20 bg-[#111714] px-8 flex items-center justify-between">
      {/* Left: Breadcrumbs or Page Title (Empty for now as per image) */}
      <div className="w-1/3">
        {/* Placeholder for future breadcrumbs */}
      </div>

      {/* Right: User & Actions */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/50 bg-[#1c2321] text-emerald-500 hover:bg-emerald-500/10 transition-colors">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-4 w-4"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-sm font-medium">La soledad</span>
          <ChevronDown className="h-4 w-4" />
        </button>

         
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
