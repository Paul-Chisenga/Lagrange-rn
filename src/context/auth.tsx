import { getStorageItemAsync, setStorageItemAsync } from "@/utils/localstorage";
import { PropsWithChildren, createContext, useState } from "react";

interface AuthState {
  session: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadAuthState: () => Promise<void>;
}
export const authContext = createContext({} as AuthState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // first time app is opened the context should be loading the session from the persistent storage

  async function handleSignIn(token: string) {
    await setStorageItemAsync("session", token);
    setSession(token);
  }
  async function handleSignOut() {
    await setStorageItemAsync("session", null);
    setSession(null);
  }
  async function loadAuthState() {
    const session = await getStorageItemAsync("session");
    setIsLoading(false);
    setSession(session);
  }

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
