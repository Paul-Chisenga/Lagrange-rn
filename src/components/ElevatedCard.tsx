import { StyleSheet, useColorScheme, ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

export function ElevatedCard({ style, ...rest }: ViewProps) {
  const theme = useColorScheme();
  return (
    <ThemedView
      style={[
        styles.container,
        { borderColor: theme === "light" ? "#0000001f" : "#ffffff11" },
        style,
      ]}
      darkColor="#ffffff11"
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});
