import React, { HTMLAttributes, useEffect, useState } from "react";
import Label from "../label/Label";
import { BoxShadow } from "@/components/types";
import { Check, Copy } from "phosphor-react";

interface CSSCodeBlockProps extends HTMLAttributes<HTMLLabelElement> {
  boxShadow: BoxShadow;
}

const CSSCodeBlock = ({ className, boxShadow }: CSSCodeBlockProps) => {
  const [cssSnippet, setCssSnippet] = useState<string[]>([]);
  const [isSnippetCopied, setIsSnippetCopied] = useState(false);

  useEffect(() => {
    const {
      horizontalOffset,
      verticalOffset,
      blur,
      spread,
      shadowColor,
      inset,
    } = boxShadow;
    const snippet = `
      box-shadow: ${
        inset ? "inset" : ""
      } ${horizontalOffset}px ${verticalOffset}px ${blur}px ${spread}px ${shadowColor};`;
    const webkitSnippet = `-webkit-${snippet}`;
    const mozSnippet = `-moz-${snippet}`;

    setCssSnippet([snippet, webkitSnippet, mozSnippet]);
  }, [boxShadow]);

  useEffect(() => {
    if (isSnippetCopied) {
      setTimeout(() => {
        setIsSnippetCopied(false);
      }, 2000);
    }
  }, [isSnippetCopied]);

  const copySnippet = async () => {
    if (isSnippetCopied) {
      return;
    } else {
      try {
        await navigator.clipboard.writeText(cssSnippet.join(" "));
        setIsSnippetCopied(true);
      } catch (error) {
        console.error("Failed to copy: ", error);
      }
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-md border-[1px] border-gray-300 p-4 ${className}`}
    >
      <div className="flex justify-between mb-5 border-b-[1px] border-gray-200 pb-[5px]">
        <Label title="CSS" className="!font-bold" />
      </div>

      <div className="select-all overflow-scroll no-scrollbar mb-6">
        {cssSnippet.map((item, index) => (
          <p
            key={index}
            className="text-sm text-gray-700 font-mono whitespace-nowrap font-semibold"
          >
            {item}
          </p>
        ))}
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 bg-blue-500 py-3 rounded-lg hover:bg-blue-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={copySnippet}
        disabled={cssSnippet.length === 0}
      >
        {isSnippetCopied ? (
          <>
            <Check color="white" size={24} weight="bold" />
            <span className="text-white text-lg font-bold">Copied!</span>
          </>
        ) : (
          <>
            <Copy color="white" size={24} weight="fill" />
            <span className="text-white text-lg font-bold">Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CSSCodeBlock;
