import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "../hooks/ThemeContext";

export default function ThemedView({ style, ...props }: ViewProps) {
  const { theme } = useTheme();

  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props} />
  );
}
