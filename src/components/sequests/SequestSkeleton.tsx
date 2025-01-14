import { Placeholder, PlaceholderLine, ShineOverlay } from "rn-placeholder";
export default function SequestSkeleton() {
  return (
    <Placeholder Animation={ShineOverlay}>
      <PlaceholderLine
        height={75}
        style={{ borderRadius: 5, marginBottom: 0 }}
      />
    </Placeholder>
  );
}
