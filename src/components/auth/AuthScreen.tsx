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
import { Form } from "../Form/Form";
import { ThemedButton, ThemedButtonProps } from "../ThemedButton";

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
      <KeyboardAvoidingView keyboardVerticalOffset={40} behavior="position">
        {children}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

interface AuthScreenFooterProps extends ViewProps {}
export function AuthScreenFooter({ style, ...rest }: AuthScreenFooterProps) {
  return <View style={[styles.footer, style]} {...rest} />;
}

interface AuthScreenProps extends PropsWithChildren {
  Img: FC<SvgProps>;
  onSubmit?: () => void;
}

export function AuthScreen({ Img, children, onSubmit }: AuthScreenProps) {
  return (
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background.default}
    >
      {/* Logo */}
      <View style={styles.imageContainer}>
        <Img style={styles.img} />
      </View>

      <Form onSubmit={onSubmit} style={styles.form}>
        <ModalCard style={styles.modal}>{children}</ModalCard>
      </Form>
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
    paddingTop: 30,
    paddingBottom: 20,
  },
  form: {},
  footer: {
    paddingTop: 5,
  },
});
