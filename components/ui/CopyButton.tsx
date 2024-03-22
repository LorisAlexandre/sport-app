"use client";

import { Copy, CopyCheck } from "lucide-react";
import { Button } from ".";
import { useEffect, useState } from "react";

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => setCopied(true));
  };

  return (
    <Button onClick={handleCopy} className="p-2 relative size-10">
      <Copy
        className={`absolute transition-all duration-1000 ease-out ${
          !copied ? "opacity-100" : "opacity-0"
        }`}
      />
      <CopyCheck
        className={`absolute transition-all duration-1000 ease-out ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      />
    </Button>
  );
};
