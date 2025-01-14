import { Pressable, View, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { TintColor } from "@/constants/Colors";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Ionicons } from "@expo/vector-icons";
import {
  ComponentProps,
  forwardRef,
  FunctionComponent,
  useCallback,
  useRef,
} from "react";
import { SvgProps } from "react-native-svg";
import useForm from "@/hooks/useForm";

export type ThemedButtonProps = {
  lightColor?: string;
  darkColor?: string;
  variant?: keyof TintColor;
  children?: string;
  iconName?: IconProps<ComponentProps<typeof Ionicons>["name"]>["name"];
  Icon?: FunctionComponent<SvgProps>;
  loading?: boolean;
  button?: boolean;
  disabled?: boolean;
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
    disabled,
    button = false,
    onPress,
  }: ThemedButtonProps,
  ref
) {
  const btnBg = useThemeColor({}, "background", "system");
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint",
    variant
  );

  // validation
  const wrapperRef = useRef<View>(null);
  const { formObjects } = useForm(wrapperRef, { set: !button });

  const handlePress = useCallback(() => {
    if (disabled) return;
    if (formObjects) {
      formObjects.handleFormSubmit();
    }
    onPress && onPress();
  }, [formObjects, onPress, disabled]);

  return (
    <View ref={wrapperRef} style={styles.container}>
      <Pressable
        ref={ref}
        style={[styles.btnContainer, { backgroundColor: btnBg }]}
        android_ripple={{ color: "#ccc" }}
        disabled={loading}
        onPress={handlePress}
      >
        {children && (
          <ThemedText style={[styles.text, { color }]}>{children}</ThemedText>
        )}
        {!Icon && <Ionicons size={24} color={color} name={iconName} />}
        {Icon && <Icon width={24} height={24} fill={color} />}
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 20,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    padding: 8,
    borderRadius: 10,
  },
  text: {
    letterSpacing: 0.36,
    fontSize: 12,
    fontFamily: "IBMPlexSans_600SemiBold",
    lineHeight: 15,
  },
});
