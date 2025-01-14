import { RefetchProps } from "@/hooks/useDataRefetch";
import {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";

// Type for components that can have RefetchProps
export type ComponentWithRefetch = ReactElement<RefetchProps>;

export interface WithDataRefetchProps extends RefetchProps {
  children: ComponentWithRefetch | ComponentWithRefetch[];
}

/**
 * Higher-Order Component to add data refetching capabilities.
 *
 * This HOC wraps its children components and provides them with data refetching capabilities.
 *
 * @component
 * @example
 * const refresh = true;
 * const handleRefreshed = () => { console.log("Data refreshed"); };
 * return (
 *   <WithDataRefetch refresh={refresh} onRefreshed={handleRefreshed}>
 *     <ChildComponent />
 *   </WithDataRefetch>
 * );
 *
 * @param {WithDataRefetchProps} props - The properties for the HOC.
 * @param {boolean} props.refresh - Indicates whether to refresh the data.
 * @param {() => void} props.onRefreshed - Callback function to be called after the data is refreshed.
 * @param {ComponentWithRefetch | ComponentWithRefetch[]} props.children - The children components to wrap.
 * @returns {ReactElement[]} - The processed children components with data refetching capabilities.
 */
const WithDataRefetch: FC<WithDataRefetchProps> = ({
  children,
  refresh,
  onRefreshed,
}) => {
  const [refreshed, setRefreshed] = useState<boolean[]>(
    new Array(Children.toArray(children).length).fill(false)
  );

  // Process children
  const processedChildren = useMemo(
    () =>
      Children.map(children, (child, idx) => {
        return cloneElement(child, {
          refresh: refresh,
          onRefreshed: () => {
            setRefreshed((prev) => {
              const copy = [...prev];
              copy[idx] = true;
              return copy;
            });
          },
        });
      }),
    [refresh, onRefreshed]
  );

  useEffect(() => {
    if (refresh) {
      setRefreshed((prev) => prev.map(() => false));
    }
  }, [refresh]);

  useEffect(() => {
    if (refreshed.every((r) => r === true) && onRefreshed) {
      onRefreshed();
    }
  }, [refreshed, onRefreshed]);

  return processedChildren;
};

export default WithDataRefetch;
