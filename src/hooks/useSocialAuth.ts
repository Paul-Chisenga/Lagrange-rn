import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useContext, useEffect } from "react";
import { Platform } from "react-native";
import { authContext } from "@/context/auth";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL!;

export default function useSocialAuth() {
  const url = Linking.useURL();
  const { signIn } = useContext(authContext);

  // Initiate google login from the browser
  // this will be handled on the backend then redirect the user back to the app via deep linking
  const handleGoogleAuth = async () => {
    await WebBrowser.openBrowserAsync(`${BACKEND_URL}/auth/google`);
  };

  // Initiate facebook login from the browser
  // this will be handled on the backend then redirect the user back to the app via deep linking
  const handleFacebookAuth = async () => {
    await WebBrowser.openBrowserAsync(`${BACKEND_URL}/auth/facebook`);
  };

  // login on provider redirect
  // the backend will initiate a deep link to the app after handling oauth with the provider
  useEffect(() => {
    if (url) {
      const parsedUrl = Linking.parse(url);
      if (Platform.OS === "ios") {
        WebBrowser.dismissBrowser();
      }
      const access_token = parsedUrl.queryParams?.access_token;
      if (access_token) {
        signIn(access_token as string);
      }
    }
  }, [url, signIn]);

  return { handleFacebookAuth, handleGoogleAuth };
}
