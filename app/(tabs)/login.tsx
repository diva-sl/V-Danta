import { LinearGradient as ExpoGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AppLoader from "../../components/AppLoader";
import FloatingInput from "../../components/FloatingInput";
import { useLoginMutation } from "../../redux/services/userApi";

const APP_LOGO = require("../../assets/Logo.png");

export default function LoginScreen() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [loginUser, { isLoading }] = useLoginMutation();

  // ⏳ Loader timing
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <AppLoader />;

  /* ================= LOGIN HANDLER ================= */

  const handleLogin = async () => {
    setError(null);

    if (!identifier.trim()) {
      setError("Enter email or phone number");
      return;
    }

    if (!password.trim()) {
      setError("Enter password");
      return;
    }

    const isEmail = identifier.includes("@");

    try {
      await loginUser({
        ...(isEmail
          ? { email: identifier.trim() }
          : { phone: identifier.trim() }),
        password: password.trim(),
      }).unwrap();

      // ✅ Token auto-saved → go to home
      router.replace("/(tabs)");
    } catch (err: any) {
      console.log("Login error:", err);
      setError(err?.data?.error || "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={APP_LOGO} style={styles.topLogo} resizeMode="contain" />

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* Email or Phone */}
      <FloatingInput
        label="Email or Phone Number"
        value={identifier}
        keyboardType={identifier.includes("@") ? "email-address" : "phone-pad"}
        onChangeText={setIdentifier}
      />

      {/* Password */}
      <FloatingInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Error */}
      {error && <Text style={{ color: "red", marginBottom: 6 }}>{error}</Text>}

      {/* Login Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.buttonWrapper}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <ExpoGradient colors={["#E7C140", "#CC8912"]} style={styles.button}>
          <Text style={styles.buttonText}>
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </ExpoGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/forgot-password")}
        style={{ alignSelf: "flex-start", marginBottom: 16 }}
      >
        <Text style={{ color: "#CDF533", fontSize: 13 }}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Links */}
      <TouchableOpacity onPress={() => router.push("/otp")}>
        <Text style={styles.otpLogin}>Login with OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.registerText}>
          Don’t have an account?{" "}
          <Text style={{ color: "#CDF533" }}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ===================== STYLES (UNCHANGED) ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#12151D",
  },

  topLogo: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "800",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 32,
  },

  buttonWrapper: {
    width: "100%",
    marginTop: 6,
    marginBottom: 8,
  },

  button: {
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },

  otpLogin: {
    color: "#CDF533",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },

  registerText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    marginTop: 14,
    textAlign: "center",
  },
});
