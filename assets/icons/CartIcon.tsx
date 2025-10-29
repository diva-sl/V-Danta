import React from "react";
import Svg, {
  Circle,
  Defs,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

export default function CartIcon({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Defs>
        {/* ✅ Green glow radial gradient */}
        <RadialGradient
          id="cartGlow"
          cx="50%"
          cy="50%"
          r="50%"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor="#00FF85" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="#00FF85" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Glow background */}
      <Circle cx="24" cy="24" r="22" fill="url(#cartGlow)" />

      {/* Cart outline */}
      <Path
        d="M16 14h18l-2 12H18l-2-12zM20 30a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0z"
        fill="#93E9D1"
      />
    </Svg>
  );
}
