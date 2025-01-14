import { dangerColor } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { View } from "react-native";
import { parseMutationError } from "@/lib/utils";

interface DataFetchErrorProps {
  error: unknown;
  center?: boolean;
}

/**
 * Component to display an error message when data fetching fails.
 *
 * @component
 */

export default function FetchError({ error, center }: DataFetchErrorProps) {
  const { message } = parseMutationError(error);

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
