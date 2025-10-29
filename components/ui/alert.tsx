// components/ui/alert.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type AlertProps = {
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
};

export function Alert({ variant = "default", title, description }: AlertProps) {
  return (
    <View
      style={[
        styles.alert,
        variant === "destructive" ? styles.destructive : styles.default,
      ]}
    >
      {title && <Text style={[styles.title]}>{title}</Text>}
      {description && <Text style={[styles.description]}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 6,
  },
  default: {
    backgroundColor: "#1e1e1e",
    borderColor: "#333",
  },
  destructive: {
    backgroundColor: "#2a1a1a",
    borderColor: "#d9534f",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#fff",
  },
  description: {
    fontSize: 13,
    color: "#aaa",
  },
});
