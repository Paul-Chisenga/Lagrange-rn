import {
  Pressable,
  View,
  type PressableProps,
  StyleSheet,
  useColorScheme,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { BackgroundColor } from "@/constants/Colors";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, forwardRef } from "react";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "link" | "outline";
  variant?: keyof BackgroundColor;
  children?: string;
  icon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
  textStyle?: TextStyle;
  style?: ViewStyle;
  loading?: boolean;
  button?: boolean;
};

export const ThemedButton = forwardRef<View, ThemedButtonProps>(function (
  {
    style,
    lightColor,
    darkColor,
    type = "default",
    variant = "default",
    children,
    icon,
    textStyle,
    loading,
    button = false,
    ...rest
  }: ThemedButtonProps,
  ref
) {
  const theme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
    variant
  );
  const borderColor = backgroundColor;
  let tintColor = variant !== "white" ? "#fff" : "#000";
  if (type !== "default") {
    tintColor = backgroundColor;
  }

  return (
    <View
      style={[
        { borderRadius: style?.borderRadius ?? 4, overflow: "hidden" },
        icon && !children && styles.icon,
      ]}
    >
      <Pressable
        ref={ref}
        style={[
          { borderRadius: style?.borderRadius ?? 4 },
          type === "default" && {
            backgroundColor: backgroundColor,
            borderColor: `${borderColor}55`,
            borderWidth: theme === "light" ? 0 : 1,
          },
          type === "outline" && {
            borderWidth: 1,
            borderColor: `${borderColor}66`,
            backgroundColor: `${tintColor}22`,
          },
          icon && !children && styles.icon,
          styles.container,
          style,
        ]}
        android_ripple={{ color: "#ccc" }}
        {...rest}
      >
        {icon && !loading && <Ionicons size={12} color={tintColor} {...icon} />}
        {loading && <ActivityIndicator size={"small"} color={tintColor} />}
        {children && (
          <ThemedText
            lightColor={tintColor}
            darkColor={tintColor}
            style={[styles.text, textStyle]}
          >
            {children}
          </ThemedText>
        )}
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
    flexGrow: 1,
  },
  text: {
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 1.5,
    fontSize: 10,
    fontFamily: "IBMPlexSans_700Bold",
    marginHorizontal: 5,
    lineHeight: 12,
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 50,
    padding: 0,
  },
});
