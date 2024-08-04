"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface MotionDivWrapperProps extends HTMLMotionProps<"div"> {}

const MotionDivWrapper = ({ children, ...rest }: MotionDivWrapperProps) => {
  return <motion.div {...rest}>{children}</motion.div>;
};

export default MotionDivWrapper;
