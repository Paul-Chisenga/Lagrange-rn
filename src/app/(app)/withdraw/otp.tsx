import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import OtpIllustration from "../../../../assets/svgs/OtpIllustration";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { useHeaderHeight } from "@react-navigation/elements";
import OTPInput from "@/components/Form/OTPInput";
import { useState } from "react";

const height = Dimensions.get("window").height;

export default function Otp() {
  const headerHeight = useHeaderHeight();
  const [otp, setOtp] = useState<number | null>(null);

  function handleProceed() {
    console.log(otp);
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <ThemedView
        style={{ flex: 1, paddingTop: headerHeight, paddingHorizontal: 20 }}
      >
        <View
          style={{
            flexShrink: 1,
            alignItems: "center",
            justifyContent: "center",
            minHeight: 100,
          }}
        >
          <OtpIllustration style={{ flexShrink: 1 }} />
        </View>
        <View style={{ maxHeight: height - 153 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 30,
              }}
            >
              <ThemedText type="subtitle">OTP VERIFICATION</ThemedText>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
                <ThemedText>Enter OTP sent to</ThemedText>
                <ThemedText style={{ flexShrink: 0 }}>
                  +254 746776965
                </ThemedText>
              </View>
              <View style={{ paddingVertical: 53 }}>
                <OTPInput onChange={setOtp} />
              </View>

              <View style={{ flexDirection: "row" }}>
                <ThemedButton variant="accent_4" onPress={handleProceed}>
                  Verify and Proceed
                </ThemedButton>
              </View>
            </View>
          </ScrollView>
        </View>
      </ThemedView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
