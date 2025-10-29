import { useTheme } from "./ThemeContext";

/**
 * Get a color from the theme by key
 */
export function useThemeColor(key: keyof ReturnType<typeof useTheme>["theme"]) {
  const { theme } = useTheme();
  return theme[key];
}
