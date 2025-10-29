import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function Badge({
  children,
  variant = "default",
  style,
  textStyle,
}: BadgeProps) {
  return (
    <View style={[styles.base, variantStyles[variant], style]}>
      <Text style={[styles.text, variantTextStyles[variant], textStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});

const variantStyles: Record<BadgeVariant, ViewStyle> = {
  default: {
    backgroundColor: "#2563eb", // primary blue
    borderColor: "transparent",
  },
  secondary: {
    backgroundColor: "#e5e7eb", // gray-200
    borderColor: "transparent",
  },
  destructive: {
    backgroundColor: "#dc2626", // red-600
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#6b7280", // gray-500
  },
};

const variantTextStyles: Record<BadgeVariant, TextStyle> = {
  default: { color: "#fff" },
  secondary: { color: "#111827" },
  destructive: { color: "#fff" },
  outline: { color: "#111827" },
};
