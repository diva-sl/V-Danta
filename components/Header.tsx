// components/Header.tsx
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CartIcon from "../assets/Cart.svg"; // cleaned version
import LogoIcon from "../assets/Logo.svg";

const { width: screenWidth } = Dimensions.get("window");

const ICON_SIZE = Math.min(screenWidth * 0.08, 36);
const FONT_SIZE = Math.min(screenWidth * 0.045, 18);
const HEADER_PADDING = Math.max(screenWidth * 0.04, 12);

export default function Header() {
  return (
    <ImageBackground
      source={require("../assets/Union.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={[styles.header, { paddingHorizontal: HEADER_PADDING }]}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <LogoIcon width={ICON_SIZE} height={ICON_SIZE} />
          <Text style={[styles.logoText, { fontSize: FONT_SIZE }]}>ELS</Text>
        </View>

        {/* Cart */}
        <CartIcon width={48} height={48} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    position: "absolute",
    top: 0,
    height: 120,
  },
  header: {
    position: "absolute",
    top: 18,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  logoText: {
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "white",
  },
});
