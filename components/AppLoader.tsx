import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const APP_LOGO = require("../assets/Logo.png");

export default function AppLoader() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Rotating Ring — PERFECTLY CENTERED */}
      <Animated.View
        style={[
          styles.ringContainer,
          {
            transform: [
              { translateX: -70 },
              { translateY: -70 },
              { rotate: spin }, // ✅ rotation added WITHOUT breaking centering
            ],
          },
        ]}
      >
        <Svg width={140} height={140}>
          <Circle
            cx="70"
            cy="70"
            r="55"
            stroke="#CDF533"
            strokeWidth="2"
            strokeDasharray="30 20"
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>

      {/* Center Logo */}
      <Image source={APP_LOGO} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12151D",
    justifyContent: "center",
    alignItems: "center",
  },

  ringContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 105,
    height: 105,
    transform: [{ translateX: -52.5 }, { translateY: -52.5 }],
  },
});
