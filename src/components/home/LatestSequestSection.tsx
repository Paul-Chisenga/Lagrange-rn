import { StyleSheet, View } from "react-native";
import { SequestCard } from "../sequests/SequestCard";
import SectionTitle from "../common/SectionTitle";
import SequestSkeleton from "../sequests/SequestSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getLatestSequest } from "@/server/sequests";
import FetchError from "../common/FetchError";
import { RefetchProps, useDataRefetch } from "@/hooks/useDataRefetch";
import React from "react";
import NoSequestCard from "../sequests/NoSequestCard";

interface LatestSequestSectionProps extends RefetchProps {}

export default function LatestSequestSection({
  refresh,
  onRefreshed,
}: LatestSequestSectionProps) {
  const {
    data: sequest,
    error,
    isLoading,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["latest-sequest"],
    queryFn: getLatestSequest,
    retry: () => false,
  });
  useDataRefetch({ refresh, onRefreshed, isFetched, refetch });
  return (
    <View style={styles.latestSequest}>
      <SectionTitle title="Latest sequest" link={"/sequests"} />
      {isLoading && !sequest && <SequestSkeleton />}
      {!isLoading && !error && !sequest && <NoSequestCard />}
      <FetchError error={error} />
      {!!sequest && <SequestCard data={sequest} />}
    </View>
  );
}
const styles = StyleSheet.create({
  latestSequest: { paddingHorizontal: 20, marginBottom: 35 },
});
