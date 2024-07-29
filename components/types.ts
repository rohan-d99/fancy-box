export interface BoxShadow {
  horizontalOffset: number;
  verticalOffset: number;
  blur: number;
  spread: number;
  shadowColor: string;
  inset: boolean;
  bgColor: string;
  boxColor: string;
  borderRadius: number;
}
export interface Shadow {
  horizontalOffset: number;
  verticalOffset: number;
  blur: number;
  spread: number;
  shadowColor: string;
  inset: boolean;
}

export interface Box {
  bgColor: string;
  boxColor: string;
  borderRadius: number;
}

export enum SliderActionKinds {
  HOFFSET = "HORIZONTAL_OFFSET",
  VOFFSET = "VERTICAL_OFFSET",
  BLUR = "BLUR",
  SPREAD = "SPREAD",
  BORDER_RADIUS = "BORDER_RADIUS",
}

export type BoxShadowAction =
  | { type: "HORIZONTAL_OFFSET"; payload: number }
  | { type: "VERTICAL_OFFSET"; payload: number }
  | { type: "BLUR"; payload: number }
  | { type: "SPREAD"; payload: number }
  | { type: "SHADOW_COLOR"; payload: string }
  | { type: "INSET"; payload: boolean }
  | { type: "RESET_SHADOW"; payload: null }
  | { type: "BG_COLOR"; payload: string }
  | { type: "BOX_COLOR"; payload: string }
  | { type: "RESET_BOX"; payload: null }
  | { type: "BORDER_RADIUS"; payload: number };
