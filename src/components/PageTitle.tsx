import { StyleSheet, TextStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { PropsWithChildren } from "react";

export default function PageTitle({
  children,
  style,
}: PropsWithChildren & { style?: TextStyle }) {
  return (
    <ThemedText style={[styles.title, style]} type="title" numberOfLines={1}>
      {children}
    </ThemedText>
  );
}
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 31,
  },
});
