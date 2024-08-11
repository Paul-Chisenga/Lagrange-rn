import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ScrollView, StyleSheet } from "react-native";
import WelcomePageLogo from "../../assets/svgs/WelcomePageLogo";
import { View } from "react-native";
import WelcomePageSvg from "../../assets/svgs/WelcomePageSvg";
import { ModalCard } from "@/components/ModalCard";
import { ThemedButton } from "@/components/ThemedButton";
import Constants from "expo-constants";
import { getStorageItemAsync, setStorageItemAsync } from "@/utils/localstorage";
import { useCallback, useEffect, useState } from "react";
import { Redirect, SplashScreen, useRouter } from "expo-router";

export default function Index() {
  const [checkingStorage, setCheckingStorage] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleNextPage() {
    setLoading(true);
    await setStorageItemAsync("lagrande_exists", "true");

    router.replace("/(app)");
  }

  const bootStrap = useCallback(async () => {
    // await setStorageItemAsync("lagrande_exists", null);
    const exists = await getStorageItemAsync("lagrande_exists");
    if (exists) {
      setFirstTime(false);
    }
    await SplashScreen.hideAsync();
    setCheckingStorage(false);
  }, []);

  // check if app is loading for the first time ever
  useEffect(() => {
    bootStrap();
  }, []);

  if (checkingStorage) {
    return null;
  }

  if (!firstTime) {
    return <Redirect href={"/(app)"} />;
  }

  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background.default}
    >
      {/* Images */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.imagesContainer}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <WelcomePageLogo style={styles.logo} />
        </View>
        {/* Explainer */}
        <WelcomePageSvg style={styles.illustration} />
      </ScrollView>
      <ModalCard style={styles.modalContainer}>
        {/* Handle */}
        <View style={styles.handleContainer}>
          <View style={styles.handleBubble} />
          <View style={styles.handleBubble} />
          <View style={styles.handleBar} />
        </View>
        {/* Text 1 */}
        <ThemedText style={styles.text1} type="subtitle">
          Turning your environmental actions into a tangible asset.
        </ThemedText>
        {/* Text 2 */}
        <ThemedText style={styles.text2} type="subtitle" lightColor={"#818181"}>
          Receive carbon credits for every tree planted sell or trade your
          earned carbon credits
        </ThemedText>
        {/* Button */}
        <View style={styles.btnContainer}>
          <ThemedButton
            style={styles.btn}
            icon={{ name: "arrow-forward" }}
            variant="default"
            onPress={handleNextPage}
            loading={loading}
          />
        </View>
      </ModalCard>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 15 + Constants.statusBarHeight,
  },
  logoContainer: {},
  logo: {
    marginLeft: "auto",
  },
  illustration: {
    maxWidth: "100%",
    marginHorizontal: "auto",
  },
  modalContainer: {
    paddingHorizontal: 31,
  },
  handleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 7,
  },
  handleBubble: {
    width: 11,
    height: 11,
    borderRadius: 11,
    backgroundColor: "#D9D9D9",
  },
  handleBar: {
    width: 43,
    height: 5,
    backgroundColor: Colors.light.background.default,
    borderRadius: 10,
  },
  text1: {
    maxWidth: 270,
    textAlign: "center",
    marginTop: 32,
    marginHorizontal: "auto",
  },
  text2: {
    marginVertical: 32,
    maxWidth: 341,
    textAlign: "center",
    marginHorizontal: "auto",
  },
  btnContainer: {
    marginBottom: 30,
    marginHorizontal: "auto",
  },
  btn: {},
});
