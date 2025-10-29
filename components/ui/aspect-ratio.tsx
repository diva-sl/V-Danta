// components/ui/aspect-ratio.tsx
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type AspectRatioProps = {
  ratio?: number; // width / height
  style?: ViewStyle;
  children?: React.ReactNode;
};

export function AspectRatio({ ratio = 1, style, children }: AspectRatioProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={{ paddingTop: `${100 / ratio}%` }} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
