"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [query] = useDebounce(searchQuery, 300);

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/");
    }
  };

  return (
    <input
      type="text"
      placeholder="Search artists..."
      className="py-2 px-4 rounded-full border border-gray-200 focus:border-blue-500 outline-none"
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
