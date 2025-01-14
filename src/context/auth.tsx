import { getStorageItemAsync, setStorageItemAsync } from "@/lib/localstorage";
import axios, { AxiosInstance } from "axios";
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
// function configureAxiosInterceptors(token: string | null) {
//   if (token) {
//     axios.interceptors.request.use((config) => {
//       config.baseURL +=
//         (config.baseURL![config.baseURL!.length - 1] === "/" ? "" : "/") +
//         "app";
//       console.log(config.baseURL);
//       config.headers["Authorization"] = `Bearer ${token}`;
//       return config;
//     });
//   } else {
//     axios.interceptors.request.clear();
//   }
// }

/**
 * Configures Axios interceptors for handling authentication.
 *
 * This function sets up request and response interceptors for Axios to handle
 * authentication tokens and error responses.
 *
 * @param {AxiosInstance} axiosInstance - The Axios instance to configure.
 * @param token- The authentication token.
 * @param {() => void} onUnauthorized - A callback function to handle unauthorized responses.
 */
function configureAxiosInterceptors(
  axiosInstance: AxiosInstance,
  token: string,
  onUnauthorized: () => void
): void {
  // Request interceptor to add the authentication token to headers
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (token) {
        config.url = "app/" + config.url;
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle unauthorized responses
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );
}

/**
 * Clears all Axios interceptors.
 *
 * This function removes all request and response interceptors from the provided Axios instance.
 *
 * @param {AxiosInstance} axiosInstance - The Axios instance from which to clear interceptors.
 */
function clearAxiosInterceptors(axiosInstance: AxiosInstance): void {
  // Clear request interceptors
  const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => config
  );
  axiosInstance.interceptors.request.eject(requestInterceptor);

  // Clear response interceptors
  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => response
  );
  axiosInstance.interceptors.response.eject(responseInterceptor);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // first time app is opened the context should be loading the session from the persistent storage

  const handleUnAuthorized = useCallback(async () => {
    await setStorageItemAsync(AUTH_STORAGE_KEY, null);
    clearAxiosInterceptors(axios);
    setSession(null);
  }, []);

  const setToken = useCallback(
    (token: string) => {
      setSession(token);
      configureAxiosInterceptors(axios, token, handleUnAuthorized);
    },
    [handleUnAuthorized]
  );

  const handleSignIn = useCallback(
    async (token: string) => {
      await setStorageItemAsync(AUTH_STORAGE_KEY, token);
      setToken(token);
    },
    [setToken]
  );

  const handleSignOut = useCallback(async () => {
    handleUnAuthorized();
  }, [handleUnAuthorized]);

  const loadAuthState = useCallback(async () => {
    const token = await getStorageItemAsync(AUTH_STORAGE_KEY);
    !!token && setToken(token);
    setIsLoading(false);
  }, [setToken]);

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
