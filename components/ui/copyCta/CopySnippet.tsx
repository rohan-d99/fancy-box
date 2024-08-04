"use client";

import { Check, Copy } from "phosphor-react";
import React, { HTMLAttributes, useEffect, useState } from "react";

interface CopySnippetProps extends HTMLAttributes<HTMLButtonElement> {
  copyString: string;
  iconColor?: string;
  textClassname?: string;
}

const CopySnippet = ({
  className,
  copyString,
  textClassname = "",
  iconColor,
}: CopySnippetProps) => {
  const [isSnippetCopied, setIsSnippetCopied] = useState(false);

  const copySnippet = async () => {
    if (isSnippetCopied) {
      return;
    }

    try {
      await navigator.clipboard.writeText(copyString);
      setIsSnippetCopied(true);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  useEffect(() => {
    if (isSnippetCopied) {
      setTimeout(() => {
        setIsSnippetCopied(false);
      }, 2000);
    }
  }, [isSnippetCopied]);

  return (
    <button
      onClick={copySnippet}
      className={`flex items-center gap-2 ${className}`}
    >
      {isSnippetCopied ? (
        <>
          <Check color={iconColor || "#1C64F2"} size={20} weight="bold" />
          <span className={textClassname}>Copied!</span>
        </>
      ) : (
        <>
          <Copy color={iconColor || "#1C64F2"} size={20} weight="fill" />
          <span className={textClassname}>Copy</span>
        </>
      )}
    </button>
  );
};

export default CopySnippet;
