import { LinearGradient as ExpoGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppLoader from "../../components/AppLoader";
import FloatingInput from "../../components/FloatingInput";
import { useRegisterMutation } from "../../redux/services/userApi";

const APP_LOGO = require("../../assets/Logo.png");

export default function Register() {
  const router = useRouter();

  // ✅ Refs (inside component)
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const mobileRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(true);

  // ✅ API hook
  const [registerUser, { isLoading }] = useRegisterMutation();

  // ✅ Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    mobile?: string;
    password?: string;
  }>({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <AppLoader />;

  /* ================= VALIDATION ================= */

  const validate = () => {
    const e: typeof errors = {};

    if (!name.trim()) e.name = "Enter full name";

    if (!email.trim()) e.email = "Enter email address";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter valid email";

    if (mobile.length !== 10) e.mobile = "Enter valid 10-digit mobile number";

    if (password.length < 6)
      e.password = "Password must be at least 6 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= REGISTER HANDLER ================= */

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await registerUser({
        name,
        email,
        phone: mobile,
        password,
      }).unwrap();

      // ✅ No OTP for now → go to login
      router.replace("/login");
    } catch (err: any) {
      console.log("Register error:", err);
      alert(err?.data?.error || "Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.logoWrap}>
        <Image source={APP_LOGO} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.title}>Create Account</Text>

      {/* INPUTS */}
      <FloatingInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        onSubmitEditing={() => emailRef.current?.focus()}
      />

      <FloatingInput
        label="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        onSubmitEditing={() => mobileRef.current?.focus()}
      />

      <FloatingInput
        label="Mobile Number"
        keyboardType="number-pad"
        value={mobile}
        onChangeText={(t) => setMobile(t.replace(/[^0-9]/g, ""))}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <FloatingInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        showStrength
        returnKeyType="done"
      />

      {/* REGISTER BUTTON */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <ExpoGradient colors={["#E7C140", "#CC8912"]} style={styles.button}>
          <Text style={styles.buttonText}>
            {isLoading ? "Registering..." : "Register"}
          </Text>
        </ExpoGradient>
      </TouchableOpacity>

      {/* LOGIN LINK */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ===================== STYLES (UNCHANGED) ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12151D",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logoWrap: {
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 110,
    height: 110,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 28,
    textAlign: "center",
  },

  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 14,
  },

  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 15,
  },

  link: {
    color: "#CDF533",
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
  },
});
