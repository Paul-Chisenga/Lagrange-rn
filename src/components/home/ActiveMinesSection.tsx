import { ScrollView, StyleSheet, View } from "react-native";
import { MineCard } from "../mines/MineCard";
import SectionTitle from "../common/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { getMines } from "@/server/mines";
import FetchError from "../common/FetchError";
import { RefetchProps, useDataRefetch } from "@/hooks/useDataRefetch";
import React from "react";
import MineCardSkeleton from "../mines/MineCardSkeleton";
import NoOpenMinesCard from "../mines/NoOpenMinesCard";

interface ActiveMinesSectionProps extends RefetchProps {}

export default function ActiveMinesSection({
  refresh,
  onRefreshed,
}: ActiveMinesSectionProps) {
  const { data, error, isLoading, isFetched, isRefetching, refetch } = useQuery(
    {
      queryKey: ["regions"],
      queryFn: getMines,
      retry: () => false,
    }
  );
  useDataRefetch({ refresh, onRefreshed, isFetched, isRefetching, refetch });
  return (
    <View style={styles.container}>
      <SectionTitle
        title="Active open mines"
        style={{ paddingHorizontal: 20 }}
      />
      {isLoading && !data && <MineCardSkeleton />}
      {!isLoading && (!data || data.mines.length === 0) && !error && (
        <NoOpenMinesCard />
      )}
      <FetchError error={error} center />
      <ScrollView
        horizontal
        contentContainerStyle={{ columnGap: 20, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      >
        {data?.mines.map((mine) => (
          <MineCard key={mine.id} data={mine} variant={"accent_1"} />
        ))}
        {/* <MineCard mine={mines[0]} variant={"accent_1"} />
        <MineCard mine={mines[1]} variant={"default"} />
        <MineCard mine={mines[2]} variant={"accent_2"} /> */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
});
