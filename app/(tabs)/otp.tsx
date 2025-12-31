import { LinearGradient as ExpoGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppLoader from "../../components/AppLoader";

const APP_LOGO = require("../../assets/Logo.png");
const OTP_LENGTH = 6;

export default function OTP() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"phone" | "otp">("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | undefined>();
  const [timer, setTimer] = useState(0);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const phoneAnim = useRef(new Animated.Value(phone ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(phoneAnim, {
      toValue: phoneFocused || phone ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [phoneFocused, phone]);

  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (timer === 0) return;
    const i = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, [timer]);

  if (loading) return <AppLoader />;

  const maskedPhone = `+91 XXXXXXX${phone.slice(-3)}`;

  const sendOtp = () => {
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setError(undefined);
    setStep("otp");
    setTimer(30);
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimeout(() => inputs.current[0]?.focus(), 200);
  };

  const verifyOtp = () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) {
      setError("Enter valid 6-digit OTP");
      return;
    }
    setError(undefined);
    Keyboard.dismiss();
    router.replace("/");
  };

  const handleOtpChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;
    const next = [...otp];
    next[index] = text;
    setOtp(next);

    if (text && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();

    if (!text && index > 0) inputs.current[index - 1]?.focus();
  };

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <View style={styles.logoWrap}>
        <Image source={APP_LOGO} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.title}>
        {step === "phone" ? "Login with OTP" : "Verify OTP"}
      </Text>
      {/* PHONE INPUT */}
      {step === "phone" && (
        <View style={{ marginBottom: error ? 6 : 20 }}>
          {/* Floating label */}
          <Animated.Text
            pointerEvents="none"
            style={[
              styles.phoneLabel,
              {
                top: phoneAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, -7],
                }),
                fontSize: phoneAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [15, 12],
                }),
              },
            ]}
          >
            Mobile Number
          </Animated.Text>

          {/* Input field */}
          <View style={styles.phoneField}>
            <Text style={styles.prefix}>+91</Text>
            <View style={styles.separator} />

            <TextInput
              value={phone}
              //   onChangeText={setPhone}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={(text) => {
                // ✅ allow digits only
                const digitsOnly = text.replace(/[^0-9]/g, "");
                setPhone(digitsOnly);
              }}
              style={styles.phoneInput}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
            />
          </View>

          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}

      {/* OTP INFO */}
      {step === "otp" && (
        <>
          <Text style={styles.infoText}>OTP sent to {maskedPhone}</Text>

          <TouchableOpacity onPress={() => setStep("phone")}>
            <Text style={styles.changeText}>Change number</Text>
          </TouchableOpacity>

          <View style={styles.otpRow}>
            {otp.map((v, i) => (
              <TextInput
                key={i}
                ref={(r) => {
                  inputs.current[i] = r;
                }}
                style={styles.otpBox}
                keyboardType="number-pad"
                maxLength={1}
                value={v}
                onChangeText={(t) => handleOtpChange(t, i)}
              />
            ))}
          </View>
        </>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {/* BUTTON */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={step === "phone" ? sendOtp : verifyOtp}
      >
        <ExpoGradient colors={["#E7C140", "#CC8912"]} style={styles.button}>
          <Text style={styles.buttonText}>
            {step === "phone" ? "Send OTP" : "Verify OTP"}
          </Text>
        </ExpoGradient>
      </TouchableOpacity>

      {/* RESEND */}
      {step === "otp" && (
        <TouchableOpacity disabled={timer > 0} onPress={() => setTimer(30)}>
          <Text style={[styles.link, timer > 0 && styles.disabled]}>
            {timer > 0
              ? `Resend OTP in ${timer}s`
              : `Resend OTP to ${maskedPhone}`}
          </Text>
        </TouchableOpacity>
      )}

      {/* BOTTOM LINKS */}
      <View style={styles.bottomLinks}>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>Login with Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12151D",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logoWrap: {
    alignItems: "center",
    marginBottom: 24,
  },

  logoText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 26,
    textAlign: "center",
  },
  logo: {
    width: 110,
    height: 110,
  },

  phoneField: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.06)",
    marginBottom: 20,

    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  phoneLabel: {
    position: "absolute",
    top: -8,
    left: 12,
    backgroundColor: "#12151D",
    paddingHorizontal: 4,
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    zIndex: 2,
  },

  prefix: {
    color: "#fff",
    fontSize: 15,
    marginRight: 8,
  },

  separator: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginRight: 10,
  },

  //   phoneField: {
  //     height: 46,
  //     width: "100%",

  //     borderRadius: 10,
  //     borderWidth: 1,
  //     borderColor: "rgba(255,255,255,0.14)",
  //     backgroundColor: "rgba(255,255,255,0.06)",

  //     flexDirection: "row",
  //     alignItems: "center",
  //     paddingHorizontal: 14,
  //   },

  //   phoneLabel: {
  //     position: "absolute",
  //     left: 14,
  //     backgroundColor: "#12151D",
  //     paddingHorizontal: 4,
  //     color: "rgba(255,255,255,0.6)",
  //     zIndex: 2,
  //   },

  //   prefix: {
  //     color: "#fff",
  //     fontSize: 15,
  //     marginRight: 8,
  //   },

  //   separator: {
  //     width: 1,
  //     height: 20,
  //     backgroundColor: "rgba(255,255,255,0.25)",
  //     marginRight: 10,
  //   },

  phoneInput: {
    flex: 1,

    height: 26, // ✅ matches field height
    fontSize: 16, // slightly bigger for phone numbers
    color: "#fff",

    paddingVertical: 0, // keeps text vertically centered
    letterSpacing: 2, // ✅ space between each digit

    textAlignVertical: "center", // Android vertical alignment
  },

  error: {
    color: "#E85B5B",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  //   phoneInput: {
  //     flex: 1,
  //     fontSize: 15,
  //     color: "#fff",
  //     paddingVertical: 0,
  //   },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.06)",
    marginBottom: 20,
  },

  //   prefix: {
  //     color: "#fff",
  //     paddingHorizontal: 12,
  //     fontSize: 15,
  //   },

  infoText: {
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 6,
  },

  changeText: {
    color: "#CDF533",
    textAlign: "center",
    marginBottom: 14,
    fontSize: 13,
  },

  //   phoneInput: {
  //     height: 46,
  //     borderRadius: 10,
  //     borderWidth: 1,
  //     borderColor: "rgba(255,255,255,0.14)",
  //     backgroundColor: "rgba(255,255,255,0.06)",
  //     paddingHorizontal: 14,
  //     color: "#fff",
  //     fontSize: 15,
  //     marginBottom: 20,
  //   },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  otpBox: {
    width: 46,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.06)",
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },

  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 14,
  },

  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 15,
  },

  //   error: {
  //     color: "#E85B5B",
  //     textAlign: "center",
  //     marginBottom: 8,
  //     fontSize: 13,
  //   },

  link: {
    color: "#CDF533",
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },

  disabled: {
    opacity: 0.5,
  },

  bottomLinks: {
    marginTop: 24,
    gap: 10,
  },
});
