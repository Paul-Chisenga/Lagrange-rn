import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { BackgroundColor } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: keyof BackgroundColor;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  variant = "system", // default to system background
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
    variant
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
