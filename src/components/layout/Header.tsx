"use client";

import { Bell, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Header() {
  return (
    <header className="h-20 border-b border-gray-200 bg-white px-8 flex items-center justify-between">
      {/* Left: Breadcrumbs or Page Title (Empty for now as per image) */}
      <div className="w-1/3">
        {/* Placeholder for future breadcrumbs */}
      </div>

      {/* Right: User & Actions */}
      <div className="flex items-center gap-4">
         <div className="flex items-center px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-medium">
            <MapPin className="h-3 w-3 mr-2" />
            La soledad
            <svg className="w-3 h-3 ml-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
         </div>
         
         <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100 relative">
            <img 
               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
               alt="User" 
               className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
         </div>
      </div>
    </header>
  );
}
