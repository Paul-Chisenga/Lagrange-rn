import { successColor } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { View } from "react-native";

export default function FetchSuccess({
  message,
  center,
}: {
  message: string;
  center?: boolean;
}) {
  if (!message) {
    return null;
  }

  return (
    <View>
      <ThemedText
        style={{
          textAlign: center ? "center" : "left",
          paddingVertical: 5,
          paddingHorizontal: 10,
          color: successColor,
        }}
      >
        {message}
      </ThemedText>
    </View>
  );
}
