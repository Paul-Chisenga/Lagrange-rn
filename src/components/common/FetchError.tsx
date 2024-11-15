import { dangerColor } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { View } from "react-native";
import { parseMutationError } from "@/lib/utils";

export default function FetchError({
  error,
  center,
}: {
  error: unknown;
  center?: boolean;
}) {
  const message = parseMutationError(error);

  if (!error) {
    return null;
  }

  return (
    <View>
      <ThemedText
        style={{
          textAlign: center ? "center" : "left",
          paddingVertical: 5,
          paddingHorizontal: 10,
          color: dangerColor,
        }}
      >
        {message}
      </ThemedText>
    </View>
  );
}
