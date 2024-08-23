import { Pressable, View, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { TintColor } from "@/constants/Colors";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, forwardRef, FunctionComponent } from "react";
import { SvgProps } from "react-native-svg";

export type ThemedButtonProps = {
  lightColor?: string;
  darkColor?: string;
  variant?: keyof TintColor;
  children?: string;
  iconName?: IconProps<ComponentProps<typeof Ionicons>["name"]>["name"];
  Icon?: FunctionComponent<SvgProps>;
  loading?: boolean;
  button?: boolean;
  onPress?: () => void;
};

export const ThemedButton2 = forwardRef<View, ThemedButtonProps>(function (
  {
    lightColor,
    darkColor,
    variant = "accent_4",
    children,
    iconName,
    Icon,
    loading,
    button = false,
    onPress,
  }: ThemedButtonProps,
  ref
) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint",
    variant
  );

  return (
    <View style={styles.container}>
      <Pressable
        ref={ref}
        style={styles.btnContainer}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
        disabled={loading}
      >
        {children && (
          <ThemedText style={[styles.text, { color }]}>{children}</ThemedText>
        )}
        {!Icon && <Ionicons size={18} color={color} name={iconName} />}
        {Icon && <Icon width={18} height={18} fill={color} />}
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 5,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  text: {
    letterSpacing: 0.36,
    fontSize: 12,
    fontFamily: "IBMPlexSans_600SemiBold",
    lineHeight: 15,
  },
});
