/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import { Colors, ThemeColor } from "@/constants/Colors";

export function useThemeColor<T extends keyof ThemeColor>(
  props: { light?: string; dark?: string },
  colorName: T,
  variant: keyof ThemeColor[typeof colorName]
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    const color = Colors[theme][colorName][variant];
    return color;
  }
}
