import {
  View,
  type ViewProps,
  type TextInputProps,
  StyleSheet,
  TextInput,
  Text,
  useColorScheme,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type ThemedInputProps = TextInputProps & {
  label?: string;
  message?: string;
  viewStyle?: ViewProps["style"];
  required?: boolean;
  onValueChange?: (text: string) => void;
};

export const ThemedTextInput = forwardRef<TextInput, ThemedInputProps>(
  function (
    {
      label,
      message,
      viewStyle,
      style,
      onValueChange,
      ...otherProps
    }: ThemedInputProps,
    ref
  ) {
    const theme = useColorScheme();
    const color = useThemeColor({}, "text", "default");
    const placeholderColor = theme === "light" ? "#697386" : "#eeeeee";
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<TextInput>(null);
    useImperativeHandle(ref, () => inputRef.current!, []);

    const [text, setText] = useState("");

    return (
      <View style={[styles.container, viewStyle]}>
        {label && (
          <ThemedText style={styles.label} lightColor="#697386">
            {label}
          </ThemedText>
        )}
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color,
              borderColor: theme === "light" ? "#E3E8EE" : "#ffffff33",
            },
            !!message && !text && styles.inputError,
            isFocused && styles.inputFocused,
            style,
          ]}
          placeholderTextColor={`${placeholderColor}33`}
          selectionColor={Colors.light.tint.default}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={text}
          onChangeText={(e) => {
            setText(e);
            if (onValueChange) {
              onValueChange(e);
            }
          }}
          {...otherProps}
        />
        {message && !text && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    rowGap: 4,
  },
  label: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 16,
  },
  inputFocused: {
    borderColor: Colors.light.tint.default,
  },
  inputError: {
    borderColor: "#ef444466",
  },
  message: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: "#ef4444",
  },
});
