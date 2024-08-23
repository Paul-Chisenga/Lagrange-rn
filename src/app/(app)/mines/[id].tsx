import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import mines from "@/data/mines.json";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedText } from "@/components/ThemedText";
import { ProjectCard } from "@/components/ProjectCard";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { Drawer } from "expo-router/drawer";

const mineImg = require("../../../../assets/images/mine.png");

export default function Mine() {
  const { id } = useLocalSearchParams();
  const mine = mines.find((m) => m.id === id)!;

  return (
    <>
      <Drawer.Screen options={{ headerTitle: mine.title }} />
      <ThemedView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {/* Header card */}
          <ThemedView
            lightColor={Colors.light.tint.default}
            darkColor={`${Colors.light.tint.white}11`}
            style={styles.mineCardContainer}
          >
            <Image source={mineImg} style={styles.mineCardImage} />
            <View style={styles.mineCardTextContainer}>
              <ThemedText
                lightColor={Colors.light.tint.white}
                darkColor={Colors.light.tint.white}
                style={styles.mineCardText}
                numberOfLines={1}
              >
                {mine.title}
              </ThemedText>
            </View>
          </ThemedView>
          <View style={{ marginTop: 20 }}>
            <ThemedTextInput label="Search available projects" />
          </View>
          {/* Projects */}
          <View style={styles.projectsContainer}>
            <ThemedText style={styles.projectTitle} type="subtitle">
              Available Projects
            </ThemedText>
            <View style={styles.projects}>
              {mine.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  mineCardContainer: {
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  mineCardImage: { width: 107, height: "100%" },
  mineCardTextContainer: { marginHorizontal: 15, paddingVertical: 50 },
  mineCardText: { fontFamily: "Inter_600SemiBold", fontSize: 16 },
  projectsContainer: {
    paddingTop: 20,
  },
  projectTitle: {
    marginBottom: 25,
  },
  projects: {
    rowGap: 25,
  },
});
