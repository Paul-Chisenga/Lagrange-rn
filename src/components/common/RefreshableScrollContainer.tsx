import { RefreshControl, ScrollView } from "react-native";
import { ThemedView } from "../ThemedView";
import React, {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import WithDataRefetch, {
  ComponentWithRefetch,
  WithDataRefetchProps,
} from "../HOC/WithDataRefetch";

interface RefreshableScrollContainerProps extends PropsWithChildren {}

// Type guard for RefetchProps
function isComponentWithRefetch(
  child: React.ReactNode
): child is ComponentWithRefetch {
  return (
    isValidElement<WithDataRefetchProps>(child) &&
    Object.is(child.type, WithDataRefetch)
  );
}

/**
 * Container component that provides scrollable view with data refetching capabilities.
 *
 * This component wraps its children with a scrollable view and ensures that only children
 * with RefetchProps are configured with data refetching capability. It also provides refresh control to trigger data refetching.
 *
 * @component
 * @example
 * const refresh = true;
 * const handleRefreshed = () => { console.log("Data refreshed"); };
 * return (
 *   <RefreshableScrollContainer>
 *     <ChildComponent refresh={refresh} onRefreshed={handleRefreshed} />
 *   </RefreshableScrollContainer>
 * );
 *
 * @param {RefreshableScrollContainerProps} props - The properties for the container.
 * @returns {ReactElement} - The rendered container component.
 */
export default function RefreshableScrollContainer({
  children,
}: RefreshableScrollContainerProps) {
  const [reload, setReload] = useState(false);
  const [refreshed, setRefreshed] = useState<Record<number, boolean>>({});

  // Initialize refreshed state based on children
  useEffect(() => {
    const initialRefreshedState: Record<number, boolean> = {};
    Children.forEach(children, (child, idx) => {
      if (isComponentWithRefetch(child)) {
        initialRefreshedState[idx] = false;
      }
    });
    setRefreshed(initialRefreshedState);
  }, [children]);

  // Process children
  const processedChildren = useMemo(() => {
    return Children.map(children, (child, idx) => {
      if (isComponentWithRefetch(child)) {
        return cloneElement(child, {
          refresh: reload,
          onRefreshed: () => {
            setRefreshed((prev) => ({ ...prev, [idx]: true }));
            setReload(false);
          },
        });
      }
      return child;
    });
  }, [children, reload]);

  useEffect(() => {
    if (reload) {
      setRefreshed((prev) => {
        const copy = { ...prev };
        for (const key in copy) {
          if (Object.prototype.hasOwnProperty.call(copy, key)) {
            copy[key] = false;
          }
        }
        return copy;
      });
    }
  }, [reload]);

  useEffect(() => {
    if (Object.values(refreshed).every((r) => r == true)) {
      setReload(false);
    }
  }, [refreshed]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={reload}
            onRefresh={() => setReload(true)}
          />
        }
      >
        {processedChildren}
      </ScrollView>
    </ThemedView>
  );
}
