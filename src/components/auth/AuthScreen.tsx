import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import { ModalCard } from "../ModalCard";
import { ThemedView } from "../ThemedView";
import Constants from "expo-constants";
import { FC, PropsWithChildren } from "react";
import { SvgProps } from "react-native-svg";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "../buttons/ThemedButton";

const { height } = Dimensions.get("window");

interface AuthScreenHeaderProps extends PropsWithChildren {
  title: string;
}
export function AuthScreenHeader({ title, children }: AuthScreenHeaderProps) {
  return (
    <View>
      <ThemedText type="title">{title}</ThemedText>
      {children}
    </View>
  );
}

interface AuthScreenContentProps extends PropsWithChildren {}
export function AuthScreenContent({ children }: AuthScreenContentProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior="padding">{children}</KeyboardAvoidingView>
    </ScrollView>
  );
}

interface AuthScreenModalProps extends PropsWithChildren {}
export function AuthScreenModal({ children }: AuthScreenModalProps) {
  return <ModalCard style={styles.modal}>{children}</ModalCard>;
}

interface AuthScreenFooterProps extends ViewProps {}
export function AuthScreenFooter({ style, ...rest }: AuthScreenFooterProps) {
  return <View style={[styles.footer, style]} {...rest} />;
}

interface AuthScreenActionsProps extends ViewProps {
  isLogin?: boolean;
  submitting?: boolean;
  onUseGoogle?: () => void;
}
export function AuthScreenActions({
  style,
  isLogin,
  submitting,
  onUseGoogle,
  ...rest
}: AuthScreenActionsProps) {
  return (
    <View style={[styles.authActions, style]} {...rest}>
      <ThemedButton
        button
        icon={{ name: "logo-google" }}
        disabled={submitting}
        onPress={onUseGoogle}
        variant="accent_4"
      />
      <View style={{ flex: 1 }}>
        <ThemedButton
          icon={{
            name: isLogin ? "log-in-outline" : "person-add-outline",
            size: 16,
          }}
          textStyle={{ fontSize: 14, lineHeight: 16 }}
          disabled={submitting}
          loading={submitting}
          type="outline"
          style={styles.authBtn}
        >
          {isLogin ? "Login" : "Register"}
        </ThemedButton>
      </View>
    </View>
  );
}

interface AuthScreenProps extends PropsWithChildren {
  Img: FC<SvgProps>;
}

export function AuthScreen({ Img, children }: AuthScreenProps) {
  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background.default}
    >
      {/* Logo */}
      <View style={styles.imageContainer}>
        <Img style={styles.img} />
      </View>

      {children}
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingTop: 30 + Constants.statusBarHeight,
  },
  img: {
    flexShrink: 1,
    minHeight: 117,
  },
  modal: {
    maxHeight: height - Constants.statusBarHeight - 120 - 30,
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 20,
  },
  form: {},
  footer: {
    paddingTop: 5,
  },
  authActions: {
    paddingTop: 5,
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  authBtn: {
    borderRadius: 50,
  },
});
