// import { Ionicons } from "@expo/vector-icons";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Animated,
//   KeyboardTypeOptions,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// interface FloatingInputProps {
//   label: string;
//   value: string;
//   onChangeText: (text: string) => void;
//   keyboardType?: KeyboardTypeOptions;
//   secureTextEntry?: boolean;
//   error?: string;
//   success?: boolean;
// }

// export default function FloatingInput({
//   label,
//   value,
//   onChangeText,
//   keyboardType = "default",
//   secureTextEntry = false,
//   error,
//   success,
// }: FloatingInputProps) {
//   const [focused, setFocused] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const anim = useRef(new Animated.Value(value ? 1 : 0)).current;
//   const inputRef = useRef<TextInput>(null);

//   useEffect(() => {
//     Animated.timing(anim, {
//       toValue: focused || value ? 1 : 0,
//       duration: 180,
//       useNativeDriver: false,
//     }).start();
//   }, [focused, value]);

//   const labelTop = anim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [18, -7],
//   });

//   const labelSize = anim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [15, 12],
//   });

//   const borderColor = error
//     ? "#E85B5B"
//     : success
//     ? "#CDF533"
//     : focused
//     ? "#CDF533"
//     : "rgba(255,255,255,0.14)";

//   return (
//     <View style={{ marginBottom: error ? 6 : 20 }}>
//       {/* Floating label (DOES NOT BLOCK INPUT) */}
//       <Animated.Text
//         pointerEvents="none" // 🔥 critical fix
//         style={[
//           styles.label,
//           {
//             top: labelTop,
//             fontSize: labelSize,
//           },
//         ]}
//       >
//         {label}
//       </Animated.Text>

//       {/* INPUT ONLY (border belongs here) */}
//       <TextInput
//         ref={inputRef}
//         value={value}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//         secureTextEntry={secureTextEntry && !showPassword}
//         style={[styles.input, { borderColor }]}
//         onFocus={() => setFocused(true)}
//         onBlur={() => setFocused(false)}
//       />

//       {/* Eye icon */}
//       {secureTextEntry && (
//         <TouchableOpacity
//           style={styles.eye}
//           onPress={() => {
//             setShowPassword((v) => !v);
//             inputRef.current?.focus();
//           }}
//         >
//           <Ionicons
//             name={showPassword ? "eye-off-outline" : "eye-outline"}
//             size={18}
//             color="#9FA3A6"
//           />
//         </TouchableOpacity>
//       )}

//       {/* Error text */}
//       {error && <Text style={styles.error}>{error}</Text>}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   input: {
//     height: 46,
//     width: "100%", // 🔥 take full available width

//     borderRadius: 10,
//     borderWidth: 1,
//     backgroundColor: "rgba(255,255,255,0.06)",

//     paddingLeft: 14, // ✅ text starts correctly
//     paddingRight: 42, // ✅ space for eye icon
//     paddingTop: 18, // ✅ space for floating label

//     color: "#fff",
//     fontSize: 15,
//   },

//   label: {
//     position: "absolute",
//     left: 14,
//     backgroundColor: "#12151D",
//     paddingHorizontal: 4,
//     color: "rgba(255,255,255,0.6)",
//     zIndex: 2,
//   },

//   eye: {
//     position: "absolute",
//     right: 12,
//     top: 18,
//   },

//   error: {
//     color: "#E85B5B",
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4,
//   },
// });
import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useEffect, useRef, useState } from "react";

import {
  Animated,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface FloatingInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  error?: string;
  showStrength?: boolean;
  returnKeyType?: "next" | "done";
  onSubmitEditing?: () => void;
}
const FloatingInput = forwardRef<
  TextInput,
  FloatingInputProps & TextInputProps
>(
  (
    {
      label,
      value,
      onChangeText,
      keyboardType = "default",
      secureTextEntry = false,
      error,
      showStrength = false,
      returnKeyType = "next",
      onSubmitEditing,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
      Animated.timing(anim, {
        toValue: focused || value ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }, [focused, value]);

    /* Floating label animation */
    const labelTop = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -7],
    });

    const labelSize = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12],
    });

    const borderColor = error
      ? "#E85B5B"
      : focused
      ? "#CDF533"
      : "rgba(255,255,255,0.14)";

    /* Password strength */
    const getStrength = () => {
      if (value.length < 4) return { label: "Weak", color: "#E85B5B" };
      if (value.length < 6) return { label: "Medium", color: "#E7C140" };
      return { label: "Strong", color: "#CDF533" };
    };

    const strength = getStrength();

    return (
      <View style={{ marginBottom: error ? 6 : 20 }}>
        {/* Floating label */}
        <Animated.Text
          pointerEvents="none"
          style={[
            styles.label,
            {
              top: labelTop,
              fontSize: labelSize,
            },
          ]}
        >
          {label}
        </Animated.Text>

        {/* Input */}
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          style={[styles.input, { borderColor }]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />

        {/* Eye icon */}
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eye}
            onPress={() => setShowPassword((v) => !v)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#9FA3A6"
            />
          </TouchableOpacity>
        )}

        {/* Strength meter */}
        {showStrength && value.length > 0 && !error && (
          <Text style={[styles.strength, { color: strength.color }]}>
            {strength.label}
          </Text>
        )}

        {/* Error */}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    height: 46,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingLeft: 14,
    paddingRight: 42,
    paddingTop: 18,
    color: "#fff",
    fontSize: 15,
  },

  label: {
    position: "absolute",
    left: 14,
    backgroundColor: "#12151D",
    paddingHorizontal: 4,
    color: "rgba(255,255,255,0.6)",
    zIndex: 2,
  },

  eye: {
    position: "absolute",
    right: 12,
    top: 14,
  },

  strength: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  error: {
    color: "#E85B5B",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
export default FloatingInput;
