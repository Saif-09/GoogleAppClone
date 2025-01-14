import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const NotificationIcon = ({
    width = 24,
    height = 24,
    stroke = "currentColor",
    fill = "none", // Default to no fill
    strokeWidth = 2, // Default stroke width

    ...props
}) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill={fill} // Controlled via props
        stroke={stroke} // Controlled via props
        strokeWidth={strokeWidth} // Controlled via props
        strokeLinecap="round" // Match your design rules
        strokeLinejoin="round" // Match your design rules
        {...props}
    >
        {/* Bell body */}
        <Path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
            fill='none' // Controlled via props
            stroke={stroke} // Controlled via props
            strokeWidth={strokeWidth} // Controlled via props
            strokeLinecap="round" // Match your design rules
            strokeLinejoin="round" // Match your design rules
        />
    </Svg>
);

export default NotificationIcon;