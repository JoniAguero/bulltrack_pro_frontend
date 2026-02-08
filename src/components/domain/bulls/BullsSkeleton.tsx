"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface BullsSkeletonProps {
  view?: "list" | "grid";
  count?: number;
}

export function BullsSkeleton({ view = "list", count = 6 }: BullsSkeletonProps) {
  return (
    <div className={cn(
      "gap-3 md:gap-4",
      view === "grid" 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
        : "flex flex-col"
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden bg-white animate-pulse">
          <CardContent className={cn(
            "p-0 flex",
            view === "grid" ? "flex-col h-full" : "flex-row items-center h-28"
          )}>
            {/* Image / Icon Placeholder */}
            <div className={cn(
               "bg-gray-100",
               view === "grid" ? "h-48 md:h-56 w-full" : "h-20 w-20 m-4 rounded-lg shrink-0"
            )} />

            {/* Content Placeholder */}
            <div className="flex-1 p-4 space-y-3">
               <div className="h-4 bg-gray-100 rounded w-3/4" />
               <div className="h-3 bg-gray-100 rounded w-1/2" />
               <div className="flex gap-2">
                  <div className="h-4 bg-gray-100 rounded w-16" />
                  <div className="h-4 bg-gray-100 rounded w-16" />
               </div>
            </div>

            {/* Score Placeholder (Desktop List only) */}
            {view === "list" && (
                <div className="hidden md:flex flex-col w-32 px-6 space-y-2">
                   <div className="h-3 bg-gray-100 rounded w-full" />
                   <div className="h-2 bg-gray-100 rounded w-full" />
                </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
