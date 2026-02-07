"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce"; // I'll create this hook if it doesn't exist

export function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [value, setValue] = useState(initialSearch);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedValue === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set("search", debouncedValue);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debouncedValue, router, searchParams]);

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input 
        type="text" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full pl-10 pr-4 py-2 text-sm focus:outline-none placeholder:text-gray-400 border-none ring-0 outline-none"
      />
    </div>
  );
}
