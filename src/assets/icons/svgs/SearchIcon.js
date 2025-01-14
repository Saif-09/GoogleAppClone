import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SearchIcon = ({
    width = 24,
    height = 24,
    stroke = "currentColor",
    fill = "none", // Default to no fill
    strokeWidth = 1, // Default stroke width
    ...props
}) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 28 28"
        fill={fill} // Controlled via props
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M11.5,2.75 C16.3324916,2.75 20.25,6.66750844 20.25,11.5 C20.25,13.6461673 19.4773285,15.6118676 18.1949905,17.1340957 L25.0303301,23.9696699 C25.3232233,24.2625631 25.3232233,24.7374369 25.0303301,25.0303301 C24.7640635,25.2965966 24.3473998,25.3208027 24.0537883,25.1029482 L23.9696699,25.0303301 L17.1340957,18.1949905 C15.6118676,19.4773285 13.6461673,20.25 11.5,20.25 C6.66750844,20.25 2.75,16.3324916 2.75,11.5 C2.75,6.66750844 6.66750844,2.75 11.5,2.75 Z M11.5,4.25 C7.49593556,4.25 4.25,7.49593556 4.25,11.5 C4.25,15.5040644 7.49593556,18.75 11.5,18.75 C15.5040644,18.75 18.75,15.5040644 18.75,11.5 C18.75,7.49593556 15.5040644,4.25 11.5,4.25 Z"
            stroke={stroke} // Controlled via props
            strokeWidth={strokeWidth} // Controlled via props
            strokeLinecap="round" // Match your design rules
            strokeLinejoin="round" // Match your design rules
            fill={fill} // Controlled via props
        />
    </Svg>
);

export default SearchIcon;