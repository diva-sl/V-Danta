import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  G,
  Path,
  Stop,
  LinearGradient as SvgLinearGradient,
  Text as SvgText,
} from "react-native-svg";

interface CircularProgressProps {
  steps?: number;
  goal?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  steps = 6076,
  goal = 10000,
}) => {
  const progress = Math.min(Math.max(steps / goal, 0), 1);

  const SVG_W = 160;
  const SVG_H = 145.1;
  const stroke = 14;
  const cx = SVG_W / 2;
  const cy = SVG_H * 0.9;
  const radius = Math.min(cx, cy) - stroke / 2;
  const halfCirc = Math.PI * radius;
  const dashArray = `${halfCirc} ${halfCirc}`;
  const dashOffset = halfCirc * (1 - progress);

  // Gradient colors
  const gradientStops = [
    "#AFEC8D",
    "#CDF533",
    "#DEDBDC",
    "#F4F2F0",
    "#CDF533",
    "#CDF533",
    "#FFD301",
    "#CE8D16",
  ];

  // Calculate pointer (arrow) position
  const knobAngleDeg = 180 - 180 * progress;
  const knobAngle = (knobAngleDeg * Math.PI) / 180;
  const knobR = radius - stroke / 2;
  const knobX = cx + knobR * Math.cos(knobAngle);
  const knobY = cy + knobR * Math.sin(knobAngle);

  // Arrow geometry
  const arrowLength = 8;
  const arrowWidth = 5;
  const tipX = cx + (radius + stroke * 0.1) * Math.cos(knobAngle);
  const tipY = cy + (radius + stroke * 0.1) * Math.sin(knobAngle);
  const baseLx = knobX + arrowWidth * Math.cos(knobAngle + Math.PI / 2);
  const baseLy = knobY + arrowWidth * Math.sin(knobAngle + Math.PI / 2);
  const baseRx = knobX + arrowWidth * Math.cos(knobAngle - Math.PI / 2);
  const baseRy = knobY + arrowWidth * Math.sin(knobAngle - Math.PI / 2);
  const arrowPath = `M ${tipX} ${tipY} L ${baseLx} ${baseLy} L ${baseRx} ${baseRy} Z`;

  // Labels
  const labels = ["0", "2500", "5000", "7500", "10k"];
  const angles = [180, 135, 90, 45, 0];

  return (
    <View style={styles.container}>
      <Svg width={SVG_W} height={SVG_H}>
        <Defs>
          <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            {gradientStops.map((color, i) => (
              <Stop
                key={i}
                offset={`${(i / (gradientStops.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </SvgLinearGradient>
        </Defs>

        <G>
          {/* Base grey arc */}
          <Circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke="#9F9E9F"
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            rotation="-180"
            origin={`${cx}, ${cy}`}
            strokeDasharray={dashArray}
          />

          {/* Gradient progress arc */}
          <Circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke="url(#grad)"
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            rotation="-180"
            origin={`${cx}, ${cy}`}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
          />

          {/* Pointer background */}
          <Circle cx={knobX} cy={knobY} r={9} fill="#12151D" />

          {/* Arrow pointer */}
          <Path d={arrowPath} fill="#FFFFFF" />

          {/* Labels inside arc */}
          {angles.map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const lx = cx + (radius - 18) * Math.cos(rad);
            const ly = cy + (radius - 18) * Math.sin(rad);
            return (
              <SvgText
                key={i}
                x={lx}
                y={ly}
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {labels[i]}
              </SvgText>
            );
          })}
        </G>
      </Svg>

      {/* Step Count */}
      <Text style={styles.stepCount}>{steps}</Text>
      <Text style={styles.stepsLabel}>Steps</Text>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  stepCount: {
    color: "#CDF533",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 6,
  },
  stepsLabel: {
    color: "#CDF533",
    fontSize: 14,
    marginTop: 2,
  },
});
