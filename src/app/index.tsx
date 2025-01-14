import { getStorageItemAsync, setStorageItemAsync } from "@/lib/localstorage";
import { useCallback, useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import Slider from "@/components/intro/Slider";

const STORAGE_KEY = process.env.EXPO_PUBLIC_INTRO_SLIDER_STORAGE_KEY!;

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const router = useRouter();

  async function handleNext() {
    setStorageItemAsync(STORAGE_KEY, "true");
    router.replace("/(tabs)");
  }

  const bootStrap = useCallback(async () => {
    const exists = await getStorageItemAsync(STORAGE_KEY);
    if (exists) {
      setFirstTime(false);
    }
    setLoaded(true);
  }, []);

  // check if app is loading for the first time ever
  useEffect(() => {
    bootStrap();
  }, [bootStrap]);

  if (!loaded) {
    return null;
  }

  if (firstTime) {
    return <Slider onNext={handleNext} />;
  }

  return <Redirect href={"/(app)"} />;
}
