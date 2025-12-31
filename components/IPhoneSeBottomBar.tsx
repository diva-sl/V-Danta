// import { useRouter } from "expo-router";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

// // ✅ Import your real SVG icons
// import Home from "../assets/Select Home.svg";
// import Profile from "../assets/Select Profile.svg";
// import Wallet from "../assets/Select Wallet.svg";

// export default function IPhoneSeBottomBar({
//   activeTab,
//   setActiveTab,
// }: {
//   activeTab: "home" | "wallet" | "profile";
//   setActiveTab: (tab: "home" | "wallet" | "profile") => void;
// }) {
//   const router = useRouter();

//   const handleTabClick = (tab: "home" | "wallet" | "profile") => {
//     setActiveTab(tab);
//     if (tab === "home") router.push("/");
//     if (tab === "wallet") router.push("/wallet");
//     if (tab === "profile") router.push("/profile");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Gradient background */}
//       <Svg
//         style={StyleSheet.absoluteFill}
//         height="100%"
//         width="100%"
//         preserveAspectRatio="none"
//       >
//         <Defs>
//           <LinearGradient id="bottomGrad" x1="0" y1="0" x2="0" y2="1">
//             <Stop offset="0" stopColor="#1D2933" stopOpacity={0.9} />
//             <Stop offset="1" stopColor="#0F1117" stopOpacity={1} />
//           </LinearGradient>
//         </Defs>
//         <Rect x="0" y="0" width="100%" height="100%" fill="url(#bottomGrad)" />
//       </Svg>

//       {/* Home */}
//       <TouchableOpacity
//         style={styles.item}
//         onPress={() => handleTabClick("home")}
//       >
//         <Home />
//         <Text
//           style={[
//             styles.label,
//             activeTab === "home" ? styles.active : styles.inactive,
//           ]}
//         >
//           Home
//         </Text>
//       </TouchableOpacity>

//       {/* Wallet */}
//       <TouchableOpacity
//         style={styles.item}
//         onPress={() => handleTabClick("wallet")}
//       >
//         <Wallet />
//         <Text
//           style={[
//             styles.label,
//             activeTab === "wallet" ? styles.active : styles.inactive,
//           ]}
//         >
//           Wallet
//         </Text>
//       </TouchableOpacity>

//       {/* Profile */}
//       <TouchableOpacity
//         style={styles.item}
//         onPress={() => handleTabClick("profile")}
//       >
//         <Profile />
//         <Text
//           style={[
//             styles.label,
//             activeTab === "profile" ? styles.active : styles.inactive,
//           ]}
//         >
//           Profile
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 72,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     borderTopWidth: 0.5,
//     borderTopColor: "#444",
//     overflow: "hidden", // gradient stays clipped
//   },
//   item: {
//     alignItems: "center",
//   },
//   label: {
//     fontSize: 12,
//     marginTop: 4,
//   },
//   active: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//   },
//   inactive: {
//     color: "rgba(255,255,255,0.6)",
//   },
// });
// components/IPhoneSeBottomBar.tsx
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

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

  const renderTab = (
    tab: "home" | "wallet" | "profile",
    iconPath: any,
    label: string
  ) => {
    const isActive = activeTab === tab;

    return (
      <TouchableOpacity
        key={tab}
        style={[styles.item]}
        onPress={() => handleTabClick(tab)}
        activeOpacity={0.85}
      >
        <View
          style={[styles.iconWrapper, isActive && styles.activeGlowWrapper]}
        >
          {/* Glow background image (shape defined by the PNG itself) */}
          {isActive && (
            <Image
              source={require("../assets/Selected Graphic.png")}
              style={styles.selectedBackground}
              resizeMode="contain"
            />
          )}

          {/* Tab icon */}
          <Image
            source={iconPath}
            style={[
              styles.icon,
              isActive ? styles.activeIcon : styles.inactiveIcon,
            ]}
            resizeMode="contain"
          />
        </View>

        <Text
          style={[styles.label, isActive ? styles.active : styles.inactive]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <Svg style={StyleSheet.absoluteFill} height="100%" width="100%">
        <Defs>
          <LinearGradient id="bottomGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0.54" stopColor="#12151D" />
            <Stop offset="1" stopColor="#1A222B" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#bottomGrad)" />
      </Svg>

      {/* Tabs */}
      {renderTab("home", require("../assets/Select Home.png"), "Home")}
      {renderTab("wallet", require("../assets/Select Wallet.png"), "Wallet")}
      {renderTab("profile", require("../assets/Select Profile.png"), "Profile")}
    </View>
  );
}

const ICON_SIZE = 22;
const GLOW_SIZE = 58;
const WRAPPER_SIZE = 46;

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
    borderTopWidth: 0.6,
    borderTopColor: "rgba(255,255,255,0.05)",
    overflow: "hidden",
  } as ViewStyle,

  item: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
    paddingHorizontal: 6,
  } as ViewStyle,

  // Icon wrapper contains the glow image + icon.
  iconWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: WRAPPER_SIZE,
    height: WRAPPER_SIZE,
  } as ViewStyle,

  // // When active: add a green border around the wrapper (visual only)
  // activeGlowWrapper: {
  //   borderWidth: 2,
  //   borderColor: "#CDF533",
  //   padding: 4,
  //   borderRadius: 999, // circular outline for the wrapper
  // } as ViewStyle,

  // Glow background PNG (positioned absolutely so it doesn't push layout)
  selectedBackground: {
    position: "absolute",
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    top: -((GLOW_SIZE - WRAPPER_SIZE) / 2),
    left: -((GLOW_SIZE - WRAPPER_SIZE) / 2),
  } as ImageStyle,

  // icon size reduced
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  } as ImageStyle,

  activeIcon: {
    tintColor: "#CDF533",
    opacity: 1,
  } as ImageStyle,

  inactiveIcon: {
    opacity: 0.45,
  } as ImageStyle,

  // TEXT styles must be TextStyle, not ViewStyle
  label: {
    fontSize: 11,
    marginTop: 2,
  } as TextStyle,

  active: {
    color: "#FFFFFF",
    fontWeight: "700",
  } as TextStyle,

  inactive: {
    color: "rgba(255,255,255,0.45)",
  } as TextStyle,
});
