import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Image } from "expo-image";
import { ElevatedCard } from "./ElevatedCard";
import { Colors } from "@/constants/Colors";

interface Props {
  title: string;
  img: {
    source: any;
    width: number;
    height: number;
  };
}

export function PaymentMethodCard({ title, img }: Props) {
  return (
    <ElevatedCard style={styles.container}>
      <ThemedText style={styles.title} type="title">
        {title}
      </ThemedText>
      <View>
        <Image
          style={[styles.image, { width: img.width, height: img.height }]}
          source={img.source}
        />
      </View>
      <View style={styles.radio} />
    </ElevatedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 22,
    gap: 10,
  },
  title: {
    fontSize: 20,
  },
  image: {},
  radio: {
    height: 16,
    width: 16,
    borderRadius: 16,
    backgroundColor: Colors.light.tint.default,
  },
});
