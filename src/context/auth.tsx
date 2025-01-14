import { getStorageItemAsync, setStorageItemAsync } from "@/lib/localstorage";
import axios from "axios";
import { PropsWithChildren, createContext, useCallback, useState } from "react";

const AUTH_STORAGE_KEY = process.env.EXPO_PUBLIC_AUTH_STORAGE_KEY!;

interface AuthState {
  session: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadAuthState: () => Promise<void>;
}
export const authContext = createContext({} as AuthState);

/**
 * Configures Axios interceptors for handling requests and responses.
 */
function configureAxiosInterceptors(token: string | null) {
  if (token) {
    axios.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  } else {
    axios.interceptors.request.clear();
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // first time app is opened the context should be loading the session from the persistent storage

  const handleSignIn = useCallback(async (token: string) => {
    await setStorageItemAsync(AUTH_STORAGE_KEY, token);
    setSession(token);
    configureAxiosInterceptors(token);
  }, []);
  const handleSignOut = useCallback(async () => {
    await setStorageItemAsync(AUTH_STORAGE_KEY, null);
    setSession(null);
    configureAxiosInterceptors(null);
  }, []);
  const loadAuthState = useCallback(async () => {
    const token = await getStorageItemAsync(AUTH_STORAGE_KEY);
    setIsLoading(false);
    setSession(token);
    configureAxiosInterceptors(token);
  }, []);

  const initialState: AuthState = {
    session,
    isLoading,
    signIn: handleSignIn,
    signOut: handleSignOut,
    loadAuthState,
  };
  return (
    <authContext.Provider value={initialState}>{children}</authContext.Provider>
  );
}
