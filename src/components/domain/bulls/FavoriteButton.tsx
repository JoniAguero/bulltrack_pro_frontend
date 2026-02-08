"use client";

import { useOptimistic, startTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";
import { toggleFavoriteAction } from "@/actions/favorites.actions";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  bullId: string;
  initialIsFavorite: boolean;
  className?: string;
}

export function FavoriteButton({ bullId, initialIsFavorite, className }: FavoriteButtonProps) {
  const [isFavorite, setOptimisticFavorite] = useOptimistic(
    initialIsFavorite,
    (state, newFavorite: boolean) => newFavorite
  );

  const handleToggle = async () => {
    startTransition(() => {
      setOptimisticFavorite(!isFavorite);
    });
    
    await toggleFavoriteAction(bullId, isFavorite);
  };

  return (
    <Button
      size="icon"
      onClick={handleToggle}
      className={cn(
        "h-8 w-8 rounded-full transition-all duration-200 shadow-sm p-1.5 border-none cursor-pointer",
        isFavorite 
          ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white" 
          : "bg-gray-900 text-white hover:bg-gray-700 hover:shadow-md",
        className
      )}
    >
      <Heart className={cn("h-full w-full transition-transform duration-200 group-hover:scale-110", isFavorite && "fill-current")} />
    </Button>
  );
}
