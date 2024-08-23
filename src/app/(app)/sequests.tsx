import { SequestCard } from "@/components/SequestCard";
import { ThemedView } from "@/components/ThemedView";
import { HeaderBackButton } from "@react-navigation/elements";
import { Drawer } from "expo-router/drawer";
import { ScrollView, StyleSheet, View } from "react-native";
export default function Sequests() {
  return (
    <>
      <Drawer.Screen
        options={{
          headerTitle: "Sequests",
          headerLeft(props) {
            return <HeaderBackButton />;
          },
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
