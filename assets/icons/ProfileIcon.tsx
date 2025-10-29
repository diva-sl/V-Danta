import React from "react";
import Svg, { Path } from "react-native-svg";

export const ProfileIcon = ({ size = 24, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 
      2.24-5 5 2.24 5 5 5zM4 21v-1c0-2.761 
      2.239-5 5-5h6c2.761 0 5 2.239 5 5v1"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
  </Svg>
);
