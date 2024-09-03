import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import BellIcon from "../../../../assets/svgs/BellIcon";
export default function WithdrawLayout() {
  // header colors
  const headerBackground = useThemeColor({}, "background", "system");
  const headerTintColor = useThemeColor({}, "text", "title");

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: headerTintColor,
        headerStyle: {},
        headerTitleStyle: { fontFamily: "IBMPlexSans_700Bold" },
        headerTitleAlign: "center",
        headerRight({ tintColor }) {
          return (
            <View>
              <TouchableOpacity>
                <BellIcon width={24} height={24} fill={tintColor} />
              </TouchableOpacity>
            </View>
          );
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="mpesa" />
      <Stack.Screen name="otp" />
    </Stack>
  );
}
