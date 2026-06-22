"use client";

import React from "react";
import { Search } from "lucide-react";

type Props = {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
};

const SearchInput = ({ value = "", onChange, placeholder = "Buscar..." }: Props) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="text-sm font-medium placeholder:text-neutral-500 text-neutral-800 dark:text-neutral-200 border border-neutral-300 py-2 px-3 pl-10 w-full rounded-md focus:outline-none"
      />
    </div>
  );
};

export default SearchInput;
