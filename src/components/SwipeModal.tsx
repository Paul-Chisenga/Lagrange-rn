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
} from "react-native";
import { AnimatedThemedView } from "./ThemedView";
import { useRouter } from "expo-router";

interface Props extends PropsWithChildren {
  visible: boolean;
  allowDismiss?: boolean;
  onDismiss?: () => void;
}

export function SwipeModal({
  visible,
  children,
  allowDismiss = true,
  onDismiss,
}: Props) {
  const theme = useColorScheme();
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
      onStartShouldSetPanResponder: () => true,
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
          handleDismiss();
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
                router.back();
              },
            },
          ]);
        }
      }}
    >
      <View style={styles.overlay}>
        <AnimatedThemedView
          style={[styles.container, { top }]}
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
  },
});
