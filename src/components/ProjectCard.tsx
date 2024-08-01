import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";

const images = {
  project_1: require("../../assets/images/project_1.jpg"),
  project_2: require("../../assets/images/project_2.jpg"),
  project_3: require("../../assets/images/project_3.jpg"),
};

interface Props {
  image: keyof typeof images;
  title: string;
  subtitle: string;
}

export function ProjectCard({ image, title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={images[image]} style={styles.image} />
      </View>
      {/* Title */}
      <View style={styles.titleContainet}>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      </View>
      {/* Button */}
      <View>
        <ThemedButton variant="default">Plant Tree</ThemedButton>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 8,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  imageContainer: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    objectFit: "cover",
  },
  titleContainet: { flex: 1 },
  title: {
    fontSize: 20,
  },
  subtitle: {
    // fontSize: 16,
  },
  btn: {},
});
