import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({ width = 24, height = 24, stroke = 'currentColor', fill = 'none' }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <Path
                d="M12 3L4 10v11h5v-6h6v6h5V10l-8-7z"
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default HomeIcon;