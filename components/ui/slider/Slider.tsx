"use client";
import { SliderActionKinds } from "@/components/types";
import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

interface SliderProps {
  minValue?: number;
  maxValue?: number;
  value: number;
  updateValue: (type: SliderActionKinds, value: number) => void;
  type: SliderActionKinds;
}

const Slider = ({
  minValue = -50,
  maxValue = 50,
  value = 0,
  updateValue,
  type,
}: SliderProps) => {
  const [thumbPosition, setThumbPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (rect) {
      const newPosition = Math.min(
        Math.max(0, event.clientX - rect.left),
        rect.width
      );
      const newValue = Math.round(
        (newPosition / rect.width) * (maxValue - minValue) + minValue
      );
      updateValue(type, newValue);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mousedown", handleMouseDown);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const constrainedValue = Math.max(minValue, Math.min(value, maxValue));
    const position =
      ((constrainedValue - minValue) / (maxValue - minValue)) * 100;
    setThumbPosition(Math.min(position, 100));
  }, [value, minValue, maxValue]);

  return (
    <div
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      className="w-[300px] h-2 bg-blue-100 rounded-full"
    >
      <div
        ref={thumbRef}
        className={`relative w-[22px] h-[22px] rounded-full border-2 transition border-blue-500 bg-white active:shadow-md active:cursor-ew-resize cursor-pointer -translate-y-2 -translate-x-1/2`}
        style={{ left: `${thumbPosition}%` }}
      />
    </div>
  );
};

export default Slider;
