"use client";

import { Bell, Search, MapPin } from "lucide-react";
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
         <div className="flex items-center px-3 py-1.5 rounded-full bg-[#1F2937] border border-gray-700 text-emerald-400 text-sm font-medium">
            <MapPin className="h-3 w-3 mr-2" />
            La soledad
            <svg className="w-3 h-3 ml-2 opacity-50 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
         </div>
         
         <div className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden border-2 border-[#111714] ring-2 ring-emerald-500 relative cursor-pointer">
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
