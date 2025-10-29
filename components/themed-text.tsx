import React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../hooks/ThemeContext";

export default function ThemedText({ style, ...props }: TextProps) {
  const { theme } = useTheme();

  return (
    <Text
      style={[{ color: theme.foreground, fontSize: theme.fontSize }, style]}
      {...props}
    />
  );
}
