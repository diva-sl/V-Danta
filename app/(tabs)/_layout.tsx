// app/(tabs)/_layout.tsx
import { Slot } from "expo-router"; // ✅ renders the active page
import React, { useState } from "react";
import { View } from "react-native";
import IPhoneSeBottomBar from "../../components/IPhoneSeBottomBar"; // ✅ move your bar here

export default function TabsLayout() {
  const [activeTab, setActiveTab] = useState<"home" | "wallet" | "profile">(
    "home"
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#12151d" }}>
      {/* This will render index.tsx, explore.tsx, etc */}
      <Slot />

      {/* Custom Bottom Navigation */}
      <IPhoneSeBottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}
