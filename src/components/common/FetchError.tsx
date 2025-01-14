import { dangerColor } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { View } from "react-native";
import { parseMutationError } from "@/lib/utils";
import { authContext } from "@/context/auth";
import { useContext, useEffect } from "react";

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
  const { signOut } = useContext(authContext);
  const { status, message } = parseMutationError(error);

  useEffect(() => {
    // sign out if token expired or when user is trying to access unauthorized endpoint
    if (status === 401 || status === 403) {
      signOut();
    }
  }, [status, signOut]);

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
