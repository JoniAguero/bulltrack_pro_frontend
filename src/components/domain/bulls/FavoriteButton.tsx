"use client";

import { useOptimistic, startTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";
import { toggleFavoriteAction } from "@/actions/favorites.actions";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  bullId: string;
  initialIsFavorite: boolean;
}

export function FavoriteButton({ bullId, initialIsFavorite }: FavoriteButtonProps) {
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
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "h-8 w-8 rounded-full transition-colors shadow-sm p-1.5",
        isFavorite 
          ? "bg-red-50 text-red-500 hover:bg-red-100" 
          : "bg-gray-900 text-white hover:bg-gray-800"
      )}
    >
      <Heart className={cn("h-full w-full", isFavorite && "fill-current")} />
    </Button>
  );
}
