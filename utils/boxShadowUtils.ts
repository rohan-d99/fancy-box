import { BoxShadow, BoxShadowAction } from "@/components/types";
import {
  defaultShadowSettings,
  defaultBoxSettings,
} from "@/constants/boxShadowConfigs";

export const boxShadowReducer = (
  state: BoxShadow,
  action: BoxShadowAction
): BoxShadow => {
  const { type, payload } = action;

  switch (type) {
    case "HORIZONTAL_OFFSET":
      return {
        ...state,
        horizontalOffset: payload,
      };
    case "VERTICAL_OFFSET":
      return {
        ...state,
        verticalOffset: payload,
      };
    case "BLUR":
      return {
        ...state,
        blur: payload,
      };
    case "SPREAD":
      return {
        ...state,
        spread: payload,
      };
    case "SHADOW_COLOR":
      return {
        ...state,
        shadowColor: payload,
      };
    case "INSET":
      return {
        ...state,
        inset: payload,
      };
    case "RESET_SHADOW":
      return {
        ...state,
        ...defaultShadowSettings,
      };
    case "BG_COLOR":
      return {
        ...state,
        bgColor: payload,
      };
    case "BOX_COLOR":
      return {
        ...state,
        boxColor: payload,
      };
    case "BORDER_RADIUS":
      return {
        ...state,
        borderRadius: payload,
      };
    case "RESET_BOX":
      return {
        ...state,
        ...defaultBoxSettings,
      };
    default:
      return state;
  }
};
