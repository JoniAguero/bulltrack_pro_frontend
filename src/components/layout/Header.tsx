"use client";

import { ChevronDown, Menu, X, MapPin } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="h-20 bg-[#111714] px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Mobile Menu Toggle & Brand (Mobile only) */}
      <div className="flex items-center gap-4 lg:hidden">
         <button 
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
         >
           {isMobileMenuOpen ? (
             <X className="h-6 w-6 text-[#36E27B]" />
           ) : (
             <Menu className="h-6 w-6 text-[#36E27B]" />
           ) }
         </button>
         
         <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[#36E27B] flex items-center justify-center text-black font-bold text-xs">
               B
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Bulltrack</span>
         </div>
      </div>

      {/* Spacer for desktop layout consistency */}
      <div className="hidden lg:block w-1/3"></div>

      {/* Right: User & Actions */}
      <div className="flex items-center gap-3 md:gap-4">
         {/* Location Button - Hidden on very small screens or compact on mobile */}
         <div className="flex items-center px-3 md:px-4 py-2 rounded-full bg-[#1F2926] border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-emerald-400 text-xs md:text-sm font-medium cursor-pointer hover:bg-[#25332f] hover:border-emerald-400 transition-all group">
            <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2 text-emerald-400" />
            <span className="max-w-[80px] md:max-w-none truncate text-[11px] md:text-sm">La soledad</span>
            <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4 ml-1.5 md:ml-2 group-hover:translate-y-0.5 transition-transform" />
         </div>
         
         {/* Profile Photo */}
         <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-600 overflow-hidden border-2 border-[#111714] ring-2 ring-emerald-500 relative cursor-pointer hover:ring-emerald-400 transition-all">
            <img 
               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
               alt="User" 
               className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 right-0 h-2 w-2 md:h-2.5 md:w-2.5 bg-green-500 rounded-full border-2 border-[#111714]"></div>
         </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
               className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
               onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Sidebar content */}
            <Sidebar 
               className="relative !flex w-[280px] animate-in slide-in-from-left duration-300" 
            />
            <button 
               onClick={() => setIsMobileMenuOpen(false)}
               className="absolute top-5 right-5 p-2 text-white bg-white/10 rounded-full"
            >
               <X className="h-5 w-5" />
            </button>
        </div>
      )}
    </header>
  );
}
