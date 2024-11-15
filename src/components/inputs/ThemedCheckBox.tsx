import { StyleSheet, TextStyle, View, ViewProps } from "react-native";
import { ThemedText } from "../ThemedText";
import Checkbox from "expo-checkbox";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TintColor } from "@/constants/Colors";
import { useCallback, useEffect, useRef, useState } from "react";
import useForm from "@/hooks/useForm";

export interface ThemedCheckProps extends ViewProps {
  name?: string;
  required?: boolean;
  checked?: boolean;
  lightColor?: string;
  darkColor?: string;
  variant?: keyof TintColor;
  textStyle?: TextStyle;
  onToggleState?: (v: boolean) => void;
}

export function ThemedCheckBox({
  name,
  required,
  checked,
  lightColor,
  darkColor,
  variant = "default",
  children,
  style,
  onToggleState,
  ...rest
}: ThemedCheckProps) {
  // theme
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

  const [value, setValue] = useState(checked);
  const [invalid, setInvalid] = useState(false);

  let color = value ? tintColor : textColor;

  if (invalid && !value) {
    color = "red";
  }

  const handleChange = (isChecked: boolean) => {
    setValue(isChecked);
    onToggleState && onToggleState(isChecked);
  };

  // validation
  const wrapperRef = useRef<View>(null);
  const { formObjects } = useForm(wrapperRef, { set: !!name });
  const handleValidateOnSubmit = useCallback(() => {
    // only components with a name and required props should be validated
    if (formObjects) {
      if (!value && required) {
        setInvalid(true);
        return false;
      }
      formObjects.formData[name!] = value;
    }
    return true;
  }, [value, name, formObjects]);

  // add input validator in the Form Element
  useEffect(() => {
    if (formObjects) {
      formObjects.formValidator[name!] = handleValidateOnSubmit;
    }
  }, [handleValidateOnSubmit, name, formObjects]);

  return (
    <View ref={wrapperRef} style={[styles.container, style]} {...rest}>
      <Checkbox
        color={color}
        value={checked ?? value}
        onValueChange={handleChange}
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
