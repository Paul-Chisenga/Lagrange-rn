import { View } from "react-native";
import { Placeholder, ShineOverlay, PlaceholderLine } from "rn-placeholder";
export default function MineCardSkeleton() {
  return (
    <Placeholder Animation={ShineOverlay}>
      <View
        style={{
          flexDirection: "row",
          columnGap: 20,
          paddingHorizontal: 20,
        }}
      >
        {Array.from(new Array(3)).map((_, idx) => (
          <PlaceholderLine
            key={idx}
            height={160}
            style={{
              marginBottom: 0,
              borderRadius: 10,
              width: "35%",
            }}
          />
        ))}
      </View>
    </Placeholder>
  );
}
