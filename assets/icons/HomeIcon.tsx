import React from "react";
import Svg, { Path } from "react-native-svg";

export const HomeIcon = ({ size = 24, active = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z"
      stroke={active ? "#CDF533" : "rgba(255,255,255,0.6)"}
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);
