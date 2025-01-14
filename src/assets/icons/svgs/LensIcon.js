import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const LensIcon = ({
  width = 24,
  height = 24,
  stroke = "#FFFFFF", // Default stroke color (white)
  fill = "#FFFFFF", // Default fill color (white)
  strokeWidth = 1, // Default stroke width
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 192 192"
    fill="none" // No fill for the entire SVG
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Outer Path */}
    <Path
      d="M74 30H62c-17.673 0-32 14.327-32 32v12m88-44h12c17.673 0 32 14.327 32 32v12m-88 88H62c-17.673 0-32-14.327-32-32v-12"
      stroke={stroke} // Controlled via props
      strokeLinecap="round" // Match your design rules
      strokeWidth={strokeWidth} // Controlled via props
    />
    {/* Middle Circle */}
    <Circle
      cx="96"
      cy="96"
      r="28"
      stroke={stroke} // Controlled via props
      strokeWidth={strokeWidth} // Controlled via props
    />
    {/* Inner Circle */}
    <Circle
      cx="145"
      cy="145"
      r="17"
      fill={fill} // Controlled via props
    />
  </Svg>
);

export default LensIcon;