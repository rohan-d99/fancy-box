import React, { Dispatch, useCallback, useRef, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { ArrowClockwise } from "phosphor-react";
import Label from "../label/Label";
import useClickOutside from "@/hooks/useClickOutside";
import { HexColorPicker } from "react-colorful";
import Input from "../input/Input";
import Slider from "../slider/Slider";
import {
  BoxShadow,
  BoxShadowAction,
  SliderActionKinds,
} from "@/components/types";
import CSSCodeBlock from "../codeBlock/CSSCodeBlock";
import MotionDivWrapper from "../motionDivWrapper/MotionDivWrapper";

interface BoxBarProps {
  state: BoxShadow;
  dispatch: Dispatch<BoxShadowAction>;
}

const BoxBar = ({ state, dispatch }: BoxBarProps) => {
  const [isOuterBoxColorPickerOpen, setIsOuterBoxColorPickerOpen] =
    useState(false);
  const [isInnerBoxColorPickerOpen, setIsInnerBoxColorPickerOpen] =
    useState(false);
  const outerBoxPopover = useRef<HTMLDivElement | null>(null);
  const innerBoxPopover = useRef<HTMLDivElement | null>(null);

  const closeOuterBoxPopover = useCallback(
    () => setIsOuterBoxColorPickerOpen(false),
    []
  );
  useClickOutside(outerBoxPopover, closeOuterBoxPopover);

  const closeInnerBoxPopover = useCallback(
    () => setIsInnerBoxColorPickerOpen(false),
    []
  );
  useClickOutside(innerBoxPopover, closeInnerBoxPopover);

  const updateValue = (type: SliderActionKinds, value: number) => {
    dispatch({
      type,
      payload: value,
    });
  };

  return (
    <Sidebar className="flex-1 flex flex-col border-l-2 border-gray-200 bg-gray-50">
      <div className="select-none pb-2 mb-6 flex justify-between items-center border-b-2 border-gray-100 border-o">
        <h2 className="uppercase text-sm text-gray-700 font-bold">
          Box properties
        </h2>
        <ArrowClockwise
          onClick={() => dispatch({ type: "RESET_BOX", payload: null })}
          size={18}
          className="text-gray-700 cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Label title="Background color" />
          <div className="w-7 h-7 border-2 border-gray-300 rounded-[4px] flex justify-center items-center">
            <div
              ref={outerBoxPopover}
              className="w-5 h-5 rounded-sm"
              style={{ backgroundColor: state.bgColor }}
              onClick={() =>
                setIsOuterBoxColorPickerOpen(!isOuterBoxColorPickerOpen)
              }
            >
              {isOuterBoxColorPickerOpen && (
                <HexColorPicker
                  color={state.bgColor}
                  onChange={(Color) =>
                    dispatch({ type: "BG_COLOR", payload: Color })
                  }
                  className="outerBoxBgPicker"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Label title="Box color" />
          <div className="w-7 h-7 border-2 border-gray-300 rounded-[4px] flex justify-center items-center">
            <div
              ref={innerBoxPopover}
              className="w-5 h-5 rounded-sm"
              style={{ backgroundColor: state.boxColor }}
              onClick={() =>
                setIsInnerBoxColorPickerOpen(!isInnerBoxColorPickerOpen)
              }
            >
              {isInnerBoxColorPickerOpen && (
                <HexColorPicker
                  color={state.boxColor}
                  onChange={(Color) =>
                    dispatch({ type: "BOX_COLOR", payload: Color })
                  }
                  className="innerBoxBgPicker"
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Label title="Border Radius" />
            <Input
              unit="px"
              value={state.borderRadius}
              onChange={(event) =>
                dispatch({
                  type: "BORDER_RADIUS",
                  payload: +event.target.value,
                })
              }
              type="number"
              max={100}
              min={0}
            />
          </div>
          <Slider
            minValue={0}
            maxValue={100}
            value={state.borderRadius}
            updateValue={updateValue}
            type={SliderActionKinds.BORDER_RADIUS}
          />
        </div>
      </div>
      <MotionDivWrapper
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.2, delay: 1 }}
        className="mt-10"
      >
        <CSSCodeBlock boxShadow={state} />
      </MotionDivWrapper>
    </Sidebar>
  );
};

export default BoxBar;
