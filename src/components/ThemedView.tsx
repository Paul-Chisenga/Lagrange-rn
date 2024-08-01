import { Animated, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { BackgroundColor } from "@/constants/Colors";
import { forwardRef } from "react";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: keyof BackgroundColor;
};

export const ThemedView = forwardRef<View, ThemedViewProps>(
  (
    {
      style,
      lightColor,
      darkColor,
      variant = "system", // default to system background
      ...otherProps
    }: ThemedViewProps,
    ref
  ) => {
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "background",
      variant
    );

    return (
      <View ref={ref} style={[{ backgroundColor }, style]} {...otherProps} />
    );
  }
);

export const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);
