import React from "react";
import Svg, { Path } from "react-native-svg";

export const FootStepsIcon = ({ size = 48, color = "#CDF533" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 21c-1.5 0-2-1.2-2-2.5S6 14 7 14s2 2 2 4.5S8.5 21 7 21zM17 21c-1.5 0-2-1.2-2-2.5S16 14 17 14s2 2 2 4.5S18.5 21 17 21z"
      fill={color}
    />
  </Svg>
);
