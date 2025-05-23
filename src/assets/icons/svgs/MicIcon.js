import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MicIcon = ({
  width = 24,
  height = 24,
  stroke = "currentColor",
  fill = "#212121", // Default fill color
  strokeWidth = 1.5, // Default stroke width
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill={fill} // Controlled via props
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M34.5,23.75 C35.1903559,23.75 35.75,24.3096441 35.75,25 C35.75,30.7904522 31.3753005,35.5591386 25.7506989,36.1812617 L25.75,38.75 C25.75,39.4403559 25.1903559,40 24.5,40 C23.8527913,40 23.3204661,39.5081253 23.2564536,38.8778052 L23.25,38.75 L23.2503043,36.1813727 C17.6252197,35.5597057 13.25,30.7907965 13.25,25 C13.25,24.3096441 13.8096441,23.75 14.5,23.75 C15.1903559,23.75 15.75,24.3096441 15.75,25 C15.75,29.8324916 19.6675084,33.75 24.5,33.75 C29.3324916,33.75 33.25,29.8324916 33.25,25 C33.25,24.3096441 33.8096441,23.75 34.5,23.75 Z M24.5,8 C27.5375661,8 30,10.4624339 30,13.5 L30,24.5 C30,27.5375661 27.5375661,30 24.5,30 C21.4624339,30 19,27.5375661 19,24.5 L19,13.5 C19,10.4624339 21.4624339,8 24.5,8 Z"
      stroke={stroke} // Controlled via props
      strokeWidth={strokeWidth} // Controlled via props
      strokeLinecap="round" // Match your design rules
      strokeLinejoin="round" // Match your design rules
      fill={fill} // Controlled via props
    />
  </Svg>
);

export default MicIcon;