import * as React from "react";
import Svg, { Path } from "react-native-svg";

const GoogleLabsIcon = ({
    width = 24,
    height = 24,
    stroke = "currentColor",
    fill = "none", // Default to no fill
    strokeWidth = 1.5, // Default stroke width
    ...props
}) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 256 256"
        fill={fill} // Controlled via props
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M223.59033,199.76855,160,93.78418V40h8a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16h8V93.78418l-40.17285,66.955c-.044.07067-.08643.1416-.12793.2135L32.40967,199.76807A15.99968,15.99968,0,0,0,46.12988,224H209.87012a15.99944,15.99944,0,0,0,13.72021-24.23145Zm-92.01269-38.92382c-14.25293-7.127-32.667-13.52124-50.31055-11.4076l28.45215-47.42053A15.99829,15.99829,0,0,0,112,93.78418V40h32V93.78418a15.99947,15.99947,0,0,0,2.28027,8.23193l38.86328,64.77222C172.03613,173.8999,153.69775,171.90405,131.57764,160.84473Z"
            stroke={stroke} // Controlled via props
            strokeWidth={strokeWidth} // Controlled via props
            strokeLinecap="round" // Match your design rules
            strokeLinejoin="round" // Match your design rules
            fill={fill} // Controlled via props
        />
    </Svg>
);

export default GoogleLabsIcon;