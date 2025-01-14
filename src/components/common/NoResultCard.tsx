import { ThemedView, ThemedViewProps } from "../ThemedView";

export interface NoResultCardProps extends ThemedViewProps {}

export default function NoResultCard({ style, ...rest }: NoResultCardProps) {
  return (
    <ThemedView
      style={[
        {
          minHeight: 75,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        },
        style,
      ]}
      lightColor="#eee"
      darkColor="#111"
      {...rest}
    />
  );
}
