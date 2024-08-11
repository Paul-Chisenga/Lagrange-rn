import PageTitle from "@/components/PageTitle";
import { SequestCard } from "@/components/SequestCard";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
export default function Sequests() {
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sequests" }} />
      <ThemedView style={styles.container}>
        {/* <PageTitle>Sequests</PageTitle> */}
        <ScrollView>
          <View style={styles.sequestsContainer}>
            {new Array(20).fill(null).map((_, idx) => (
              <SequestCard
                key={idx}
                project={"Jamuhuri wetland"}
                trees={500}
                carbon={47.71}
              />
            ))}
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sequestsContainer: {
    rowGap: 15,
    padding: 20,
  },
});
