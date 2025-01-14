import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView, ThemedViewProps } from "../ThemedView";

export interface NoResultCardProps extends ThemedViewProps {}

export default function NoResultCard({ style, ...rest }: NoResultCardProps) {
  const borderColor = useThemeColor({}, "text", "default");
  return (
    <ThemedView
      style={[
        {
          minHeight: 75,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderWidth: 1,
          borderColor: `${borderColor}11`,
        },
        style,
      ]}
      lightColor="#fafafa"
      darkColor="#111"
      {...rest}
    />
  );
}
