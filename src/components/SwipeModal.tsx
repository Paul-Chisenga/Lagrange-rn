import { PropsWithChildren, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  useColorScheme,
  View,
  ScrollView,
  ViewProps,
  ViewStyle,
} from "react-native";
import { AnimatedThemedView } from "./ThemedView";
import { useRouter } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "@/constants/Colors";

interface SwipeModalHeaderProps extends ViewProps {}
export function SwipeModalHeader(props: SwipeModalHeaderProps) {
  return <View {...props} />;
}
interface SwipeModalContentProps extends ViewProps {}
export function SwipeModalContent(props: SwipeModalContentProps) {
  return (
    <ScrollView
      style={{}}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View {...props} />
    </ScrollView>
  );
}
interface SwipeModalFooterProps extends ViewProps {}
export function SwipeModalFooter(props: SwipeModalFooterProps) {
  return <View {...props} />;
}

interface Props extends PropsWithChildren {
  visible: boolean;
  allowDismiss?: boolean;
  staticModal?: boolean;
  containerStyle?: ViewStyle;
  onDismiss?: () => void;
}

export function SwipeModal({
  visible,
  children,
  allowDismiss = true,
  staticModal = false,
  containerStyle,
  onDismiss,
}: Props) {
  const headerHeight = useHeaderHeight();
  const theme = useColorScheme();

  const containerRef = useRef<View>(null);

  const panY = useRef(
    new Animated.Value(Dimensions.get("screen").height)
  ).current;

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: Dimensions.get("screen").height,
    duration: 500,
    useNativeDriver: false,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !staticModal,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gs) => {
        if (gs.dy > 0 && gs.vy > 1 && allowDismiss) {
          return closeAnim.start(onDismiss);
        }
        return resetPositionAnim.start();
      },
    })
  ).current;

  function handleDismiss() {
    closeAnim.start(onDismiss);
  }

  useEffect(() => {
    visible && resetPositionAnim.start();
  }, [visible]);

  const router = useRouter();
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={() => {
        if (allowDismiss) {
          // handleDismiss();
          if (onDismiss) {
            onDismiss();
          }
        } else {
          Alert.alert("", "Are you sure you want to cancel this process ?", [
            {
              text: "No",
              style: "cancel",
              isPreferred: true,
            },
            {
              text: "Yes",
              style: "destructive",
              onPress() {
                // router.back();
                if (onDismiss) {
                  onDismiss();
                }
              },
            },
          ]);
        }
      }}
    >
      <View style={styles.overlay}>
        <AnimatedThemedView
          ref={containerRef}
          style={[
            styles.container,
            {
              top,
              maxHeight: Dimensions.get("screen").height - headerHeight - 50,
            },
            containerStyle,
          ]}
          {...panResponder.panHandlers}
        >
          <View
            style={[
              styles.handle,
              { backgroundColor: theme === "light" ? "#E3E8EE" : "#555" },
            ]}
          />
          {children}
        </AnimatedThemedView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    paddingTop: 12,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  handle: {
    height: 3,
    width: Dimensions.get("screen").width / 3,
    marginHorizontal: "auto",
    borderRadius: 50,
    marginBottom: 15,
  },
});
