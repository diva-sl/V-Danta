import { useColorScheme as _useColorScheme } from "react-native";

/**
 * Returns the system color scheme: 'light' | 'dark' | null
 */
export function useColorScheme() {
  return _useColorScheme();
}
