import { useEffect } from "react";

/**
 * Interface for properties related to refetching or reloading data.
 *
 * @interface RefetchProps
 * @property {boolean} [refresh] - Indicates whether to refetch the data.
 * @property {() => void} [onRefreshed] - Callback function to be called after the data is refetched.
 */
export interface RefetchProps {
  refresh?: boolean;
  onRefreshed?: () => void;
}

/**
 * Custom hook to handle data refetching.
 *
 * This hook triggers a refetch of data when the `refresh` property is true.
 * It also calls the `onRefreshed` callback function after the data is refetched.
 *
 * @param {RefetchProps & { isFetched: boolean; refetch: Function }} props - The properties for the hook.
 */
export function useDataRefetch({
  refresh,
  onRefreshed,
  isFetched,
  refetch,
}: RefetchProps & { isFetched: boolean; refetch: Function }) {
  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh]);

  useEffect(() => {
    if (isFetched && onRefreshed) {
      onRefreshed();
    }
  }, [isFetched, onRefreshed]);
}
