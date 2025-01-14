import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function MinesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
