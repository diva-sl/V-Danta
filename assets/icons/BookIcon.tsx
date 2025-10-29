import React from "react";
import Svg, { Path } from "react-native-svg";

export const BookIcon = ({ size = 24, color = "#9A91EE" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5V6.5C4 5.39543 4.89543 4.5 6 4.5H18C19.1046 4.5 20 5.39543 20 6.5V19.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path d="M12 4.5V20" stroke={color} strokeWidth={2} />
  </Svg>
);
