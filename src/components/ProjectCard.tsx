import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import { useState } from "react";
import {
  SwipeModal,
  SwipeModalContent,
  SwipeModalFooter,
  SwipeModalHeader,
} from "./SwipeModal";
import { ThemedTextInput } from "./ThemedTextInput";
import PageTitle from "./PageTitle";
import { ThemedButton1 } from "./ThemedButton1";
import { Ionicons } from "@expo/vector-icons";

const images: { [key: string]: string } = {
  project_1: require("../../assets/images/project_1.jpg"),
  project_2: require("../../assets/images/project_2.jpg"),
  project_3: require("../../assets/images/project_3.jpg"),
};

type Project = {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
};

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const [plantTree, setPlantTree] = useState(false);
  const [photos, setPhotos] = useState(false);

  function handleSubmitMeasurement() {
    setPhotos(false);
    setPlantTree(true);
  }

  function handleSubmitSequest() {
    // setPhotos(true);
    setPlantTree(false);
  }

  return (
    <>
      <View style={styles.container}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={images[project.image_url]} style={styles.image} />
        </View>
        {/* Title */}
        <View style={styles.titleContainet}>
          <ThemedText type="subtitle" style={styles.title}>
            {project.title}
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.subtitle}>
            {project.subtitle}
          </ThemedText>
        </View>
        {/* Button */}
        <View>
          <ThemedButton variant="default" onPress={() => setPhotos(true)}>
            Plant Tree
          </ThemedButton>
        </View>
      </View>
      {/* Sequest Form */}
      <SwipeModal visible={plantTree} onDismiss={() => setPlantTree(false)}>
        <SwipeModalHeader
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
            marginBottom: 20,
          }}
        >
          <ThemedButton1
            iconName="arrow-back"
            variant="system"
            onPress={() => {
              setPlantTree(false);
              setPhotos(true);
            }}
          />
          <PageTitle style={{ marginBottom: 0 }}>{project.title}</PageTitle>
        </SwipeModalHeader>
        <SwipeModalContent style={{ paddingHorizontal: 25, rowGap: 25 }}>
          <ThemedTextInput label="Registration" />
          <ThemedTextInput label="Tree Species" />
          <ThemedTextInput label="DGL( Diameter at Ground Level)" />
          <ThemedTextInput label="Tree Height" />
          <ThemedTextInput label="Tree Age" />
        </SwipeModalContent>
        <SwipeModalFooter
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <ThemedButton icon={{ name: "cart-outline" }}>
            Proceed Carbon
          </ThemedButton>
        </SwipeModalFooter>
      </SwipeModal>
      {/* Sequest pictures */}
      <SwipeModal visible={photos} onDismiss={() => setPhotos(false)}>
        <SwipeModalHeader style={{}}>
          <PageTitle style={{ marginBottom: 5 }}>{project.title}</PageTitle>
          <ThemedText
            style={{
              textAlign: "center",
              width: "80%",
              marginHorizontal: "auto",
            }}
          >
            Capture and upload measurement process,documenting key steps like
            measuring tree height, diameter at ground level, and species.
          </ThemedText>
        </SwipeModalHeader>
        <SwipeModalContent style={{ paddingHorizontal: 25 }}>
          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#00000011",
              height: 300,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemedButton1 iconName="camera" />
          </View>
        </SwipeModalContent>
        <SwipeModalFooter
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <ThemedButton
            icon={{ name: "arrow-forward" }}
            onPress={handleSubmitMeasurement}
          >
            Proceed
          </ThemedButton>
        </SwipeModalFooter>
      </SwipeModal>
    </>
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
    // fontSize: 20,
  },
  subtitle: {
    // fontSize: 16,
  },
  btn: {},
});
