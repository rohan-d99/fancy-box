"use client";

import Navbar from "@/components/ui/navbar/Navbar";
import ShadowBar from "@/components/ui/shadowBar/ShadowBar";
import { useReducer } from "react";
import BoxBar from "@/components/ui/boxBar/BoxBar";
import {
  defaultBoxSettings,
  defaultShadowSettings,
} from "@/constants/boxShadowConfigs";
import { boxShadowReducer } from "@/utils/boxShadowUtils";
import MotionDivWrapper from "@/components/ui/motionDivWrapper/MotionDivWrapper";

export default function Home() {
  const [boxShadowState, dispatch] = useReducer(boxShadowReducer, {
    ...defaultBoxSettings,
    ...defaultShadowSettings,
  });

  return (
    <main className="relative w-full min-h-screen">
      <Navbar />
      <div className="flex justify-between bg-gray-100">
        <ShadowBar state={boxShadowState} dispatch={dispatch} />
        <div className="flex-1 flex justify-center items-center">
          <MotionDivWrapper
            className={`bg-white border-2 border-gray-300 w-[400px] h-[400px] rounded-md flex justify-center items-center`}
            style={{ backgroundColor: boxShadowState.bgColor }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
          >
            <MotionDivWrapper
              className="w-[200px] h-[200px] rounded-lg bg-white"
              style={{
                boxShadow: `${boxShadowState.inset ? "inset" : ""} ${
                  boxShadowState.horizontalOffset
                }px ${boxShadowState.verticalOffset}px ${
                  boxShadowState.blur
                }px ${boxShadowState.spread}px ${boxShadowState.shadowColor}`,
                backgroundColor: boxShadowState.boxColor,
                borderRadius: `${boxShadowState.borderRadius}px`,
              }}
              initial={{ rotate: 45, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.3, delay: 0.4 }}
            />
          </MotionDivWrapper>
        </div>
        <BoxBar state={boxShadowState} dispatch={dispatch} />
      </div>
    </main>
  );
}
