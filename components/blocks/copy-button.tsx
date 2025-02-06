"use client";

import { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      className="absolute right-3 top-3 p-2 rounded-md hover:bg-zinc-800 focus:outline-none"
      onClick={copy}
    >
      {isCopied ? (
        <IconCheck className="w-4 h-4 text-green-400" />
      ) : (
        <IconCopy className="w-4 h-4 text-zinc-400" />
      )}
    </button>
  );
} 