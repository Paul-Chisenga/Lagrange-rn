import { StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";
import { Href, Link } from "expo-router";
import { ThemedButton2 } from "../buttons/ThemedButton2";

interface SectionTitleProps {
  title: string;
  link?: Href;
  style?: ViewStyle;
}

export default function SectionTitle({
  title,
  link,
  style,
}: SectionTitleProps) {
  return (
    <View style={[styles.container, style]}>
      <ThemedText type="subtitle">{title}</ThemedText>
      {link && (
        // <Link href={link} asChild>
        <ThemedButton2 iconName="arrow-forward" variant="default" />
        // </Link>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
});
