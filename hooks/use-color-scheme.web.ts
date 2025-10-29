import { useEffect, useState } from "react";

/**
 * Web fallback for color scheme detection.
 */
export function useColorScheme() {
  const getScheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [scheme, setScheme] = useState<string>(getScheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setScheme(getScheme());
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return scheme;
}
