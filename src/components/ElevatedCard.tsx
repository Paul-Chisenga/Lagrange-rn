import { StyleSheet, useColorScheme, ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

export function ElevatedCard({ style, ...rest }: ViewProps) {
  const theme = useColorScheme();
  return (
    <ThemedView
      style={[
        styles.container,
        { borderColor: theme === "light" ? "#00000008" : "#ffffff11" },
        style,
      ]}
      darkColor="#ffffff11"
      lightColor="#00000005"
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
  },
});
