import { ChevronDown } from "lucide-react-native";
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

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
};

export function AccordionItem({ title, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={styles.item}>
      {/* Trigger */}
      <TouchableOpacity style={styles.trigger} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        <ChevronDown
          size={18}
          color="#fff"
          style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>

      {/* Content */}
      <Collapsible collapsed={!open}>
        <View style={styles.content}>{children}</View>
      </Collapsible>
    </View>
  );
}

export function Accordion({ children }: { children: React.ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    marginBottom: 4,
  },
  trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 6,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#2a2a2a",
  },
});
