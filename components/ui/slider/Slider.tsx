"use client";
import { MouseEvent, useRef, useState } from "react";

interface SliderProps {
  label: string;
  minValue: number;
  maxValue: number;
  value: number;
  onChange: () => void;
}

const Slider = ({
  label,
  maxValue = 300,
  minValue = 0,
  value = 0,
}: Partial<SliderProps>) => {
  const [position, setPosition] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offsetX = Math.round(event.clientX - rect.left);

    if (offsetX >= minValue && offsetX <= maxValue) {
      setPosition(offsetX);
    }

    console.log("offsetX", offsetX);
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // document.addEventListener("mousemove", (e) => handleMouseMove(e));
  };

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  return (
    <div>
      <div
        className="relative w-[300px] h-2 bg-blue-100 rounded full"
        ref={trackRef}
        // onMouseDown={(event) => }
      >
        <div
          ref={thumbRef}
          style={{ left: `${position}px` }}
          className={`absolute -translate-x-1/2 -translate-y-2 w-6 h-6 rounded-full border border-blue-600 bg-white opacity-20 cursor-pointer`}
        />
      </div>
    </div>
  );
};

export default Slider;
