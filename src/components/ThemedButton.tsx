import { Pressable, View, type PressableProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { BackgroundColor } from "@/constants/Colors";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "link" | "outline";
  variant?: keyof BackgroundColor;
  children: string;
  icon?: IconProps<ComponentProps<typeof Ionicons>["name"]>;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "default",
  variant = "default",
  children,
  icon,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
    variant
  );

  return (
    <View style={{ borderRadius: 8, overflow: "hidden" }}>
      <Pressable
        style={[
          { backgroundColor: type === "default" ? backgroundColor : undefined },
          styles.container,
          type === "default" ? styles.default : undefined,
          type === "outline" ? styles.outline : undefined,
          type === "link" ? styles.link : undefined,
          style,
        ]}
        {...rest}
        android_ripple={{ color: "#000" }}
      >
        {icon && (
          <Ionicons
            size={16}
            color={variant !== "system" ? "#fff" : "#000"}
            {...icon}
          />
        )}
        <ThemedText
          lightColor={variant !== "white" ? "#fff" : "#000"}
          darkColor={variant !== "white" ? "#fff" : "#000"}
          style={styles.text}
        >
          {children}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
  },
  default: {},
  outline: {
    borderWidth: 1,
  },
  link: {},
  text: {
    textTransform: "uppercase",
    textAlign: "center",
    // fontWeight: "700",
    letterSpacing: 1.5,
    fontSize: 10,
    fontFamily: "IBMPlexSans_700Bold",
  },
});
