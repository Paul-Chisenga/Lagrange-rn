import { StyleSheet, ViewProps } from "react-native";
import { AnimatedThemedView } from "./ThemedView";

interface Props extends ViewProps {}

export function ModalCard({ style, ...rest }: Props) {
  return (
    <AnimatedThemedView
      darkColor={"#202223"}
      style={[styles.container, style]}
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
