import {
  Pressable,
  View,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { BackgroundColor, Colors, TintColor } from "@/constants/Colors";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Ionicons } from "@expo/vector-icons";
import {
  ComponentProps,
  forwardRef,
  FunctionComponent,
  ReactElement,
} from "react";
import { SvgProps } from "react-native-svg";

type ItemColor = {
  light?: string;
  dark?: string;
};

type ButtonType = "default" | "link" | "outline";

export type ThemedButtonProps = {
  lightColor?: string;
  darkColor?: string;
  type?: ButtonType;
  variant?: keyof BackgroundColor;
  children?: string;
  iconName?: IconProps<ComponentProps<typeof Ionicons>["name"]>["name"];
  Icon?: FunctionComponent<SvgProps>;
  loading?: boolean;
  button?: boolean;
};

function parseIconColor(
  type: ButtonType,
  variant: keyof TintColor
): ItemColor | undefined {
  let color: ItemColor | undefined;

  switch (type) {
    case "outline":
    case "link":
      break;
    default:
      color = { light: "#ffffff", dark: "#ffffff" };
      switch (variant) {
        case "accent_3":
        case "white":
          color = { light: "#000000", dark: "#000000" };
          break;
        default:
          break;
      }
      break;
  }

  return color;
}
function parseTextColor(variant: keyof TintColor): ItemColor | undefined {
  let color: ItemColor | undefined;

  switch (variant) {
    case "accent_4":
      color = { dark: Colors.dark.text.default };
      break;
    case "white":
      color = { light: "#000000", dark: Colors.dark.text.default };
      break;
    default:
      break;
  }

  return color;
}
function parseBorderColor(
  type: ButtonType,
  variant: keyof TintColor
): ItemColor | undefined {
  let color: ItemColor | undefined;

  switch (type) {
    case "outline":
    case "link":
      break;
    default:
      break;
  }

  return color;
}
export const ThemedButton1 = forwardRef<View, ThemedButtonProps>(function (
  {
    lightColor,
    darkColor,
    variant = "default",
    type = "default",
    children,
    iconName,
    Icon,
    loading,
    button = false,
  }: ThemedButtonProps,
  ref
) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
    variant
  );
  const iconFill = useThemeColor(
    { ...parseIconColor(type, variant) },
    "tint",
    variant
  );
  const color = useThemeColor({ ...parseTextColor(variant) }, "tint", variant);
  const borderColor = useThemeColor(
    { ...parseBorderColor(type, variant) },
    "tint",
    variant
  );

  return (
    <View style={styles.container}>
      {type !== "link" && (
        <View style={styles.btnContainer}>
          <Pressable
            ref={ref}
            style={[
              type === "default" && { backgroundColor: backgroundColor },
              type === "outline" && { borderWidth: 1, borderColor },
              styles.btnInnerContainer,
            ]}
            android_ripple={{ color: "#ccc" }}
          >
            {!Icon && <Ionicons size={18} color={iconFill} name={iconName} />}
            {Icon && <Icon width={18} height={18} fill={iconFill} />}
          </Pressable>
        </View>
      )}

      {children && (
        <View style={styles.textContainer}>
          {loading && <ActivityIndicator size={"small"} color={color} />}
          <ThemedText style={[styles.text, { color }]}>{children}</ThemedText>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  btnContainer: {
    overflow: "hidden",
    width: 40,
    height: 40,
    borderRadius: 50,
    padding: 0,
    rowGap: 2,
  },
  btnInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 50,
    padding: 0,
  },
  textContainer: {
    flexDirection: "row",
    columnGap: 2,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    letterSpacing: 0.36,
    fontSize: 12,
    fontFamily: "IBMPlexSans_600SemiBold",
    lineHeight: 15,
    textTransform: "capitalize",
  },
});
