import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";

// enable layout animation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  title: string;
  children: React.ReactNode;
};

export function RNCollapsible({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      {/* Trigger */}
      <TouchableOpacity onPress={toggle} style={styles.trigger}>
        <Text style={styles.triggerText}>{title}</Text>
      </TouchableOpacity>

      {/* Content */}
      <Collapsible collapsed={!isOpen}>
        <View style={styles.content}>{children}</View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  trigger: {
    padding: 12,
    backgroundColor: "#2a2a2a",
    borderRadius: 6,
  },
  triggerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    padding: 12,
    backgroundColor: "#444",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
