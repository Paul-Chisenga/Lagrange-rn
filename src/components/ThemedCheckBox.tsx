import { StyleSheet, TextStyle, View, ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";
import Checkbox from "expo-checkbox";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TintColor } from "@/constants/Colors";
import { useState } from "react";

export interface ThemedCheckProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
  required?: boolean;
  variant?: keyof TintColor;
  textStyle?: TextStyle;
  checked?: boolean;
  message?: string;
  onToggleState?: (v: boolean) => void;
}

export function ThemedCheckBox({
  lightColor,
  darkColor,
  variant = "default",
  required,
  checked,
  children,
  style,
  message,
  onToggleState,
  ...rest
}: ThemedCheckProps) {
  const [value, setValue] = useState(checked);
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
    "default"
  );
  const tintColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint",
    variant
  );

  let color = value ? tintColor : textColor;

  if (message && !value) {
    color = "red";
  }

  return (
    <View style={[styles.container, style]} {...rest}>
      <Checkbox
        color={color}
        value={checked ?? value}
        onValueChange={(v) => {
          setValue(v);
          if (onToggleState) {
            onToggleState(v);
          }
        }}
      />
      <ThemedText style={styles.label}>{children}</ThemedText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexDirection: "row", columnGap: 5, alignItems: "flex-start" },
  checkbox: {},
  label: {
    textAlign: "center",
  },
});
