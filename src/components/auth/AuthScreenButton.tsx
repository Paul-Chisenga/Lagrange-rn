import { StyleSheet } from "react-native";
import { ThemedButtonProps, ThemedButton } from "../ThemedButton";

export interface AuthScreenButtonProps extends ThemedButtonProps {}
export function AuthScreenButton({
  style,
  icon,
  textStyle,
  ...rest
}: AuthScreenButtonProps) {
  return (
    <ThemedButton
      style={[styles.btn, style]}
      icon={icon ? { name: icon.name, size: 16 } : undefined}
      textStyle={{ fontSize: 14, lineHeight: 16, ...textStyle }}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    paddingTop: 10,
    maxWidth: 200,
    width: "100%",
    marginHorizontal: "auto",
  },
});
