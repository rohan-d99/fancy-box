import React, { Dispatch, useCallback, useRef, useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import { ArrowClockwise, Check } from "phosphor-react";
import Label from "../label/Label";
import Input from "../input/Input";
import Slider from "../slider/Slider";
import { HexAlphaColorPicker } from "react-colorful";
import { Checkbox } from "@headlessui/react";
import useClickOutside from "../../../hooks/useClickOutside";
import {
  BoxShadow,
  BoxShadowAction,
  SliderActionKinds,
} from "@/components/types";

interface ShadowBarProps {
  state: BoxShadow;
  dispatch: Dispatch<BoxShadowAction>;
}

const ShadowBar = ({ state, dispatch }: ShadowBarProps) => {
  const [isColorPickerOpen, toggle] = useState(false);
  const [isInset, setIsInset] = useState(false);
  const popover = useRef<HTMLDivElement | null>(null);
  const updateValue = (type: SliderActionKinds, value: number) => {
    dispatch({
      type,
      payload: value,
    });
  };

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  const toggleInset = () => {
    const newInsetValue = !isInset;
    setIsInset(newInsetValue);
    dispatch({ type: "INSET", payload: newInsetValue });
  };

  return (
    <Sidebar className="flex-1 flex flex-col border-r-2 border-gray-200 bg-gray-50">
      <div className="select-none pb-2 mb-6 flex justify-between items-center border-b-2 border-gray-100 border-o">
        <h2 className="uppercase text-sm text-gray-700 font-bold">shadow</h2>
        <ArrowClockwise
          onClick={() => dispatch({ type: "RESET_SHADOW", payload: null })}
          size={18}
          className="text-gray-700 cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Label title="Horizontal Offset" />
            <Input
              unit="px"
              value={state.horizontalOffset}
              onChange={(event) =>
                updateValue(SliderActionKinds.HOFFSET, +event.target.value)
              }
              type="number"
              max={100}
              min={-100}
            />
          </div>
          <Slider
            minValue={-100}
            maxValue={100}
            value={state.horizontalOffset}
            updateValue={updateValue}
            type={SliderActionKinds.HOFFSET}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Label title="Vertical Offset" />
            <Input
              unit="px"
              value={state.verticalOffset}
              onChange={(event) =>
                updateValue(SliderActionKinds.VOFFSET, +event.target.value)
              }
              type="number"
              max={100}
            />
          </div>
          <Slider
            minValue={-100}
            maxValue={100}
            value={state.verticalOffset}
            updateValue={updateValue}
            type={SliderActionKinds.VOFFSET}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Label title="Blur" />
            <Input
              unit="px"
              value={state.blur}
              onChange={(event) =>
                updateValue(SliderActionKinds.BLUR, +event.target.value)
              }
              type="number"
              max={100}
            />
          </div>
          <Slider
            minValue={0}
            maxValue={100}
            value={state.blur}
            updateValue={updateValue}
            type={SliderActionKinds.BLUR}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Label title="Spread" />
            <Input
              unit="px"
              value={state.spread}
              onChange={(event) =>
                updateValue(SliderActionKinds.SPREAD, +event.target.value)
              }
              type="number"
              max={100}
            />
          </div>
          <Slider
            minValue={-100}
            maxValue={100}
            value={state.spread}
            updateValue={updateValue}
            type={SliderActionKinds.SPREAD}
          />
        </div>
        <div className="flex justify-between items-center">
          <Label title="Shadow Color" />
          <div className="w-7 h-7 border-2 border-gray-300 rounded-[4px] flex justify-center items-center">
            <div
              ref={popover}
              className="w-5 h-5 rounded-sm"
              style={{ backgroundColor: state.shadowColor }}
              onClick={() => toggle(!isColorPickerOpen)}
            >
              {isColorPickerOpen && (
                <HexAlphaColorPicker
                  color={state.shadowColor}
                  onChange={(Color) =>
                    dispatch({ type: "SHADOW_COLOR", payload: Color })
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Label title="Inset" />
          <Checkbox
            className="size-7 flex justify-center items-center cursor-pointer rounded border-2 bg-white data-[checked]:bg-blue-500"
            checked={isInset}
            onChange={toggleInset}
          >
            <Check size={20} weight="bold" color="white" />
          </Checkbox>
        </div>
      </div>
    </Sidebar>
  );
};

export default ShadowBar;
