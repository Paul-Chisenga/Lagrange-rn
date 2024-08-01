import { StyleSheet, Text, View } from "react-native";
import { ThemedTextInput } from "../ThemedTextInput";
import { ThemedButton } from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import { Form } from "../Form/Form";

interface Props {
  loading?: boolean;
  onForgotPassword?: () => void;
  onSwitchToSignup?: () => void;
  onSubmit: (uid: string, pwd: string) => void;
}

export default function LoginForm({
  onForgotPassword,
  onSwitchToSignup,
  onSubmit,
  loading,
}: Props) {
  function handleSubmit() {
    onSubmit("", "");
  }

  return (
    <View style={styles.container}>
      <View>
        <ThemedText style={styles.title} type="title">
          Welcome
        </ThemedText>
        <ThemedText style={styles.description}>
          Don't have an account yet ?{" "}
          <Text style={{ color: "red" }} onPress={onSwitchToSignup}>
            Register Now
          </Text>{" "}
        </ThemedText>
      </View>
      {/* Form */}
      <Form onSubmit={handleSubmit} style={styles.form}>
        <View style={styles.formGroup}>
          <ThemedTextInput label="ID NO" placeholder="Type ID No" required />
          <ThemedTextInput
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            required
          />
          <ThemedText
            style={styles.forgotPassword}
            type="defaultSemiBold"
            disabled={loading}
            onPress={onForgotPassword}
          >
            Forgot password
          </ThemedText>
        </View>
        <View style={styles.btnContainer}>
          <ThemedButton
            style={styles.btn}
            variant="default"
            icon={{ name: "log-in", size: 16 }}
            textStyle={{ fontSize: 14, lineHeight: 16 }}
            disabled={loading}
            loading={loading}
          >
            Login
          </ThemedButton>
        </View>
      </Form>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {},
  description: {},
  form: {
    paddingBottom: 20,
  },
  formGroup: {
    paddingVertical: 30,
    rowGap: 20,
  },
  forgotPassword: {
    marginLeft: "auto",
  },
  btnContainer: { maxWidth: 200, width: "100%", marginHorizontal: "auto" },
  btn: {
    borderRadius: 50,
    paddingTop: 10,
  },
});
