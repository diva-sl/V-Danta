import { LinearGradient as ExpoGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AppLoader from "../../components/AppLoader";
import FloatingInput from "../../components/FloatingInput";
import { useForgotPasswordMutation } from "../../redux/services/userApi";

const APP_LOGO = require("../../assets/Logo.png");

export default function ForgotPassword() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(true);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <AppLoader />;

  const handleSubmit = async () => {
    try {
      const isEmail = identifier.includes("@");

      const res = await forgotPassword(
        isEmail ? { email: identifier.trim() } : { phone: identifier.trim() }
      ).unwrap();

      router.push({
        pathname: "/reset-password",
        params: { userId: res.userId },
      });
    } catch (e: any) {
      alert(e?.data?.error || "User not found");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={APP_LOGO} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email or phone to continue</Text>

      <FloatingInput
        label="Email or Phone"
        value={identifier}
        onChangeText={setIdentifier}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.85}
        style={{ marginTop: 12 }}
      >
        <ExpoGradient
          colors={["#E7C140", "#CC8912"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientButton, isLoading && { opacity: 0.7 }]}
        >
          <Text style={styles.gradientButtonText}>
            {isLoading ? "Please wait..." : "Continue"}
          </Text>
        </ExpoGradient>
      </TouchableOpacity>
      {/* Cancel */}
      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.cancelText}>Cancel & go back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12151D",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  logo: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 16,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },

  actionText: {
    color: "#CDF533",
    fontSize: 15,
    textAlign: "center",
  },

  cancelText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 18,
  },
  gradientButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  gradientButtonText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "700",
  },
});
