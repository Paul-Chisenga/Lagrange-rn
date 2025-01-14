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
import { ThemedText } from "../ThemedText";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import useForm from "@/hooks/useForm";

export type ThemedInputProps = TextInputProps & {
  label?: string;
  name?: string;
  viewStyle?: ViewProps["style"];
  required?: boolean;
};

export const ThemedTextInput = forwardRef<TextInput, ThemedInputProps>(
  function (
    {
      label,
      name,
      required,
      value,
      defaultValue,
      viewStyle,
      style,
      onChangeText,
      ...otherProps
    }: ThemedInputProps,
    ref
  ) {
    const theme = useColorScheme();
    const color = useThemeColor({}, "text", "default");
    const placeholderColor = theme === "light" ? "#697386" : "#eeeeee";

    const [text, setText] = useState(value ?? defaultValue ?? "");
    const [isFocused, setIsFocused] = useState(false);
    const [message, setMessage] = useState("");

    const inputRef = useRef<TextInput>(null);
    useImperativeHandle(ref, () => inputRef.current!, []);

    function handleTextChange(v: string) {
      setText(v);
      onChangeText && onChangeText(v);
    }

    // Validation
    const { formObjects } = useForm(inputRef, { set: !!name });
    const handleValidateOnSubmit = useCallback(() => {
      // only components with a name and required props should be validated
      if (formObjects) {
        if (!text && required) {
          setMessage("This field is required");
          return false;
        }
        formObjects!.formData[name!] = text;
      }
      return true;
    }, [text, name, formObjects]);

    //initialize the input data and add input validator in the Form Element
    useEffect(() => {
      if (formObjects) {
        formObjects!.formData[name!] = text;
        formObjects.formValidator[name!] = handleValidateOnSubmit;
      }
    }, [handleValidateOnSubmit, name, formObjects]);

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
          onChangeText={handleTextChange}
          onSubmitEditing={formObjects?.handleFormSubmit}
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
    fontFamily: "Inter_400Regular",
    // fontSize: 12,
    lineHeight: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontFamily: "Inter_400Regular",
    // fontSize: 12,
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
