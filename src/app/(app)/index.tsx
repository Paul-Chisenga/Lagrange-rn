import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import WelcomePageLogo from "../../../assets/svgs/WelcomePageLogo";
import { Drawer } from "expo-router/drawer";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import SequestOverviewSection from "@/components/home/SequestOverviewSection";
import LatestSequestSection from "@/components/home/LatestSequestSection";
import ActiveMinesSection from "@/components/home/ActiveMinesSection";
import SequestsActionsSection from "@/components/home/SequestsActionsSection";

export default function Index() {
  const [reload, setReload] = useState(false);

  return (
    <>
      <Drawer.Screen
        options={{
          headerTitle() {
            return <WelcomePageLogo height={45} />;
          },
        }}
      />
      {/* <CustomDrawerContent /> */}
      <ThemedView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => setReload(true)}
            />
          }
        >
          <SequestOverviewSection
            refresh={reload}
            onRefreshed={() => setReload(false)}
          />
          <SequestsActionsSection />
          <LatestSequestSection
            refresh={reload}
            onRefreshed={() => setReload(false)}
          />
          <ActiveMinesSection
            refresh={reload}
            onRefreshed={() => setReload(false)}
          />
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
