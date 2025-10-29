import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

// ✅ Import your real SVG icons
import Home from "../assets/Select Home.svg";
import Profile from "../assets/Select Profile.svg";
import Wallet from "../assets/Select Wallet.svg";

export default function IPhoneSeBottomBar({
  activeTab,
  setActiveTab,
}: {
  activeTab: "home" | "wallet" | "profile";
  setActiveTab: (tab: "home" | "wallet" | "profile") => void;
}) {
  const router = useRouter();

  const handleTabClick = (tab: "home" | "wallet" | "profile") => {
    setActiveTab(tab);
    if (tab === "home") router.push("/");
    if (tab === "wallet") router.push("/wallet");
    if (tab === "profile") router.push("/profile");
  };

  return (
    <View style={styles.container}>
      {/* Gradient background */}
      <Svg
        style={StyleSheet.absoluteFill}
        height="100%"
        width="100%"
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id="bottomGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#1D2933" stopOpacity={0.9} />
            <Stop offset="1" stopColor="#0F1117" stopOpacity={1} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#bottomGrad)" />
      </Svg>

      {/* Home */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleTabClick("home")}
      >
        <Home />
        <Text
          style={[
            styles.label,
            activeTab === "home" ? styles.active : styles.inactive,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Wallet */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleTabClick("wallet")}
      >
        <Wallet />
        <Text
          style={[
            styles.label,
            activeTab === "wallet" ? styles.active : styles.inactive,
          ]}
        >
          Wallet
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleTabClick("profile")}
      >
        <Profile />
        <Text
          style={[
            styles.label,
            activeTab === "profile" ? styles.active : styles.inactive,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#444",
    overflow: "hidden", // gradient stays clipped
  },
  item: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  active: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  inactive: {
    color: "rgba(255,255,255,0.6)",
  },
});
