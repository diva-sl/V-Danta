import React from "react";
import Svg, { Path } from "react-native-svg";

export const WalletIcon = ({ size = 24, color = "white" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 7h18v10H3z" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);
