import RefreshableScrollContainer from "@/components/common/RefreshableScrollContainer";
import WithDataRefetch from "@/components/HOC/WithDataRefetch";
import ActiveMinesSection from "@/components/home/ActiveMinesSection";
import LatestSequestSection from "@/components/home/LatestSequestSection";
import SequestOverviewSection from "@/components/home/SequestOverviewSection";
import SequestsActionsSection from "@/components/home/SequestsActionsSection";

export default function Home() {
  return (
    <RefreshableScrollContainer>
      <WithDataRefetch>
        <SequestOverviewSection />
      </WithDataRefetch>
      <SequestsActionsSection />
      <WithDataRefetch>
        <LatestSequestSection />
        <ActiveMinesSection />
      </WithDataRefetch>
    </RefreshableScrollContainer>
  );
}
