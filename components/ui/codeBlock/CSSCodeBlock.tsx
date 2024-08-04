import React, { HTMLAttributes, useEffect, useState } from "react";
import Label from "../label/Label";
import { BoxShadow } from "@/components/types";
import CopySnippet from "../copyCta/CopySnippet";

interface CSSCodeBlockProps extends HTMLAttributes<HTMLLabelElement> {
  boxShadow: BoxShadow;
}

const CSSCodeBlock = ({ className, boxShadow }: CSSCodeBlockProps) => {
  const [cssSnippet, setCssSnippet] = useState<string[]>([]);

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
        inset ? "inset " : ""
      }${horizontalOffset}px ${verticalOffset}px ${blur}px ${spread}px ${shadowColor};`;

    const webkitSnippet = `-webkit-${snippet.trim()}`;
    const mozSnippet = `-moz-${snippet.trim()}`;

    setCssSnippet([snippet, webkitSnippet, mozSnippet]);
  }, [boxShadow]);

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
      <CopySnippet
        iconColor="white"
        copyString={cssSnippet.join("\n")}
        textClassname="text-white text-lg font-bold"
        className="w-full flex items-center justify-center gap-2 bg-blue-500 py-3 rounded-lg hover:bg-blue-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default CSSCodeBlock;
