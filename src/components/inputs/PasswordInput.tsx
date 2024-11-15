import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedInputProps, ThemedTextInput } from "./ThemedTextInput";
import { ThemedCheckBox } from "./ThemedCheckBox";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export type PasswordInputProps = ThemedInputProps & {};

export function PasswordInput({ ...rest }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const iconColor = useThemeColor({}, "text", "default");

  return (
    <View style={styles.container}>
      <ThemedTextInput secureTextEntry={!visible} {...rest} />
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => setVisible(!visible)}
      >
        <Ionicons
          name={visible ? "eye-off-outline" : "eye-outline"}
          size={16}
          color={iconColor}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  toggle: {
    position: "absolute",
    zIndex: 1,
    right: 15,
    top: 32,
  },
});
