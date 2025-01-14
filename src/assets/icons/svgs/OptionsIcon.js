import React from 'react';
import Svg, { Path } from 'react-native-svg';

const OptionsIcon = ({ width = 24, height = 24, stroke = 'currentColor' }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path
                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                stroke={stroke}
                strokeWidth="1"
                fill={'gray'}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default OptionsIcon;