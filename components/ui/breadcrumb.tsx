import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type BreadcrumbProps = {
  children: React.ReactNode;
  style?: any;
};

export function Breadcrumb({ children, style }: BreadcrumbProps) {
  return (
    <View accessibilityLabel="breadcrumb" style={[styles.breadcrumb, style]}>
      {children}
    </View>
  );
}

export function BreadcrumbList({ children, style }: BreadcrumbProps) {
  return <View style={[styles.list, style]}>{children}</View>;
}

export function BreadcrumbItem({ children, style }: BreadcrumbProps) {
  return <View style={[styles.item, style]}>{children}</View>;
}

type BreadcrumbLinkProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
};

export function BreadcrumbLink({
  children,
  onPress,
  style,
}: BreadcrumbLinkProps) {
  return (
    <TouchableOpacity onPress={onPress} accessibilityRole="link">
      <Text style={[styles.link, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

export function BreadcrumbPage({ children, style }: BreadcrumbProps) {
  return (
    <Text
      accessibilityRole="text"
      accessibilityState={{ disabled: true }}
      style={[styles.page, style]}
    >
      {children}
    </Text>
  );
}

type BreadcrumbSeparatorProps = {
  style?: any;
  children?: React.ReactNode;
};

export function BreadcrumbSeparator({
  children,
  style,
}: BreadcrumbSeparatorProps) {
  return (
    <View style={[styles.separator, style]}>
      {children ?? (
        <Svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <Path
            d="M9 18l6-6-6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
  );
}

export function BreadcrumbEllipsis({ style }: { style?: any }) {
  return (
    <View style={[styles.ellipsis, style]}>
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
        <Path d="M6 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
  },
  link: {
    color: "#2563eb", // blue
    fontSize: 14,
  },
  page: {
    color: "#111827", // dark
    fontSize: 14,
    fontWeight: "500",
  },
  separator: {
    marginHorizontal: 4,
  },
  ellipsis: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
});
