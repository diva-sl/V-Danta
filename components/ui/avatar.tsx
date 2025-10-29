import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type AvatarProps = {
  uri?: string; // Image URL
  size?: number; // Size of the avatar
  fallbackText?: string; // Fallback initials/text
  style?: ViewStyle; // Container style
  textStyle?: TextStyle; // Fallback text style
};

export function Avatar({
  uri,
  size = 40,
  fallbackText = "U",
  style,
  textStyle,
}: AvatarProps) {
  const [error, setError] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {!error && uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          onError={() => setError(true)}
        />
      ) : (
        <View style={[styles.fallback, { borderRadius: size / 2 }]}>
          <Text style={[styles.fallbackText, textStyle]}>{fallbackText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#555",
  },
  fallbackText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
