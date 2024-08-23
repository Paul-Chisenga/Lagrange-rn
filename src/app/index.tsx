import { getStorageItemAsync, setStorageItemAsync } from "@/utils/localstorage";
import { useCallback, useEffect, useState } from "react";
import { Redirect, SplashScreen, useRouter } from "expo-router";
import Slider from "@/components/intro/Slider";

export default function Index() {
  const [firstTime, setFirstTime] = useState(true);

  const router = useRouter();

  async function handleNext() {
    setStorageItemAsync("lagrande_exists", "true");
    router.replace("/(app)");
  }

  const bootStrap = useCallback(async () => {
    const exists = await getStorageItemAsync("lagrande_exists");
    if (exists) {
      setFirstTime(false);
    }
    await SplashScreen.hideAsync();
  }, []);

  // check if app is loading for the first time ever
  useEffect(() => {
    bootStrap();
  }, [bootStrap]);

  if (firstTime) {
    return <Slider onNext={handleNext} />;
  }

  return <Redirect href={"/(app)"} />;
}
