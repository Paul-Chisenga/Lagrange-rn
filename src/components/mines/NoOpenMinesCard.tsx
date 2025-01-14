import NoResultCard, { NoResultCardProps } from "../common/NoResultCard";
import { ThemedText } from "../ThemedText";
export default function NoOpenMinesCard({ style, ...rest }: NoResultCardProps) {
  return (
    <NoResultCard
      style={[{ height: 150, marginHorizontal: 20 }, style]}
      {...rest}
    >
      <ThemedText style={{ opacity: 0.5 }}>
        There are current no open mines.
      </ThemedText>
    </NoResultCard>
  );
}
