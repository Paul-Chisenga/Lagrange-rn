import {
  Dimensions,
  StyleSheet,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";
import { AnimatedThemedView } from "./ThemedView";

interface Props extends ViewProps {}

export function ModalCard({ style, children, ...rest }: Props) {
  const theme = useColorScheme();

  return (
    <AnimatedThemedView
      darkColor={"#202223"}
      style={[styles.container, style]}
      {...rest}
    >
      <View
        style={[
          styles.handle,
          { backgroundColor: theme === "light" ? "#E3E8EE" : "#555" },
        ]}
      />
      {children}
    </AnimatedThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  handle: {
    height: 3,
    width: Dimensions.get("screen").width / 5,
    marginHorizontal: "auto",
    borderRadius: 50,
    marginBottom: 15,
  },
});
