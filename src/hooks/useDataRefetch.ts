import { useEffect, useState } from "react";

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

interface UserDataRefetchParams extends RefetchProps {
  isRefetching: boolean;
  isFetched: boolean;
  refetch: Function;
}

/**
 * Custom hook to handle data refetching.
 *
 * This hook triggers a refetch of data when the `refresh` property is true.
 * It also calls the `onRefreshed` callback function after the data is refetched.
 *
 * @param {UserDataRefetchParams} params - The parameters for the hook.
 * @param {boolean} params.refresh - Indicates whether to refresh the data.
 * @param {() => void} [params.onRefreshed] - Callback function to be called after the data is refetched.
 * @param {boolean} params.isRefetching - Indicates whether the data is currently being refetched.
 * @param {boolean} params.isFetched - Indicates whether the data has been successfully fetched.
 * @param {() => void} params.refetch - Function to trigger the data refetch.
 */
export function useDataRefetch({
  refresh,
  onRefreshed,
  isRefetching,
  isFetched,
  refetch,
}: UserDataRefetchParams) {
  const [watch, setWatch] = useState(false);

  /**
   * Effect to trigger the refetch function when `refresh` is true.
   */
  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh]);

  /**
   * Effect to call the `onRefreshed` callback function after the data is successfully fetched.
   */
  useEffect(() => {
    if (watch && isFetched && onRefreshed) {
      onRefreshed();
      setWatch(false);
    }
  }, [watch, isFetched, onRefreshed]);

  /**
   * Effect to set the `watch` state to true when the data is being refetched.
   */
  useEffect(() => {
    if (isRefetching) {
      setWatch(true);
    }
  }, [isRefetching]);
}
