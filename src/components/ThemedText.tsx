import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { forwardRef } from "react";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export const ThemedText = forwardRef<Text, ThemedTextProps>(function (
  { style, lightColor, darkColor, type = "default", ...rest }: ThemedTextProps,
  ref
) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
    type === "default" || type === "defaultSemiBold" ? "default" : "title"
  );

  return (
    <Text
      ref={ref}
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
});

const styles = StyleSheet.create({
  default: {
    fontSize: 12,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
  },
  defaultSemiBold: {
    fontSize: 12,
    lineHeight: 24,
    // fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "IBMPlexSans_700Bold",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "IBMPlexSans_600SemiBold",
  },
  link: {
    lineHeight: 30,
    fontSize: 12,
    color: "#0a7ea4",
    fontFamily: "Inter_400Regular",
  },
});
