// app/(tabs)/_layout.tsx
import { Slot, usePathname } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import IPhoneSeBottomBar from "../../components/IPhoneSeBottomBar";

export default function TabsLayout() {
  const [activeTab, setActiveTab] = useState<"home" | "wallet" | "profile">(
    "home"
  );

  const pathname = usePathname();

  // Pages where bottom bar should NOT appear
  const hideBottomBarRoutes = [
    "/login",
    "/register",
    "/otp",
    "/forgot-password",
    "/reset-password",
  ];

  const hideBar = hideBottomBarRoutes.includes(pathname);

  return (
    <View style={{ flex: 1, backgroundColor: "#12151d" }}>
      <Slot />

      {/* Render bottom bar only when allowed */}
      {!hideBar && (
        <IPhoneSeBottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </View>
  );
}
