import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import PageTitle from "../common/PageTitle";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { Placeholder, ShineOverlay, PlaceholderLine } from "rn-placeholder";
import { useQuery } from "@tanstack/react-query";
import { getSequestsOverview } from "@/server/sequests";
import FetchError from "../common/FetchError";
import { RefetchProps, useDataRefetch } from "@/hooks/useDataRefetch";

interface SequestOverviewSectionProps extends RefetchProps {}

export default function SequestOverviewSection({
  refresh,
  onRefreshed,
}: SequestOverviewSectionProps) {
  const { data, error, isLoading, isFetched, isRefetching, refetch } = useQuery(
    {
      queryKey: ["sequests-overview"],
      queryFn: getSequestsOverview,
      retry: () => false,
    }
  );

  useDataRefetch({ refresh, onRefreshed, isRefetching, isFetched, refetch });

  return (
    <View style={styles.container}>
      {/* <PageTitle>Total Carbon Sequested</PageTitle> */}
      {isLoading && !data && (
        <Placeholder Animation={ShineOverlay}>
          <PlaceholderLine
            width={40}
            height={25}
            style={{ alignSelf: "center" }}
          />
          <PlaceholderLine
            width={20}
            height={20}
            style={{ alignSelf: "flex-end" }}
          />
        </Placeholder>
      )}
      <FetchError error={error} />
      {!!data && (
        <>
          <View style={styles.tco2eContainer}>
            <ThemedText
              type="title"
              lightColor={Colors.light.tint.accent_1}
              darkColor={Colors.light.tint.accent_1}
            >
              {data.tCO2}
            </ThemedText>
            <ThemedText
              type="subtitle"
              lightColor={Colors.light.tint.default}
              darkColor={Colors.light.tint.default}
            >
              tCO2e
            </ThemedText>
          </View>
          <ThemedText
            style={styles.shillings}
            type="subtitle"
            lightColor={Colors.light.tint.accent_4}
          >
            Ksh {data.cash.ksh}
          </ThemedText>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 20 },
  tco2eContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  shillings: { paddingHorizontal: 30, textAlign: "right" },
});
