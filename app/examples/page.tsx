import Navbar from "@/components/ui/navbar/Navbar";
import React from "react";
import { SHADOWS } from "@/constants/shadows";
import { Metadata } from "next";
import CopySnippet from "@/components/ui/copyCta/CopySnippet";
import MotionDivWrapper from "@/components/ui/motionDivWrapper/MotionDivWrapper";

export const metadata: Metadata = {
  title: "FancyBox - CSS Box Shadow Examples",
  description: "explore css box shadow examples",
};

const Box = ({ shadow, index }: { shadow: string; index: number }) => {
  return (
    <MotionDivWrapper
      className="group flex flex-col gap-3 justify-center items-center w-[200px] h-[200px] bg-white rounded-md"
      style={{ boxShadow: shadow }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 40 },
      }}
    >
      <h2 className="translate-y-5 group-hover:translate-y-0 text-4xl font-bold text-gray-400 transition-all duration-200">
        {index + 1}
      </h2>
      <CopySnippet
        copyString={`box-shadow: ${shadow};`}
        textClassname="text-blue-600 font-bold"
        className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 bg-blue-100 rounded-full px-3 py-[6px] hover:bg-blue-200 "
      />
    </MotionDivWrapper>
  );
};

const Examples = () => {
  return (
    <main className="relative w-full min-h-screen">
      <Navbar />
      <div className="mt-[80px] flex flex-col">
        <div className="flex justify-center">
          <h3 className="text-5xl font-bold text-gray-700">Popular Examples</h3>
        </div>
        <div className="mx-auto mt-[104px] pb-28">
          <div className="flex flex-wrap gap-[68px] max-w-[1120px] justify-center">
            {SHADOWS.map((shadow, index) => (
              <Box key={shadow} index={index} shadow={shadow} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Examples;
