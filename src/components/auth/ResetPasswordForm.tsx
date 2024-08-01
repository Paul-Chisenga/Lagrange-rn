import { StyleSheet, View } from "react-native";
import { ThemedTextInput } from "../ThemedTextInput";
import { ThemedButton } from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import { Form } from "../Form/Form";

interface Props {
  loading?: boolean;
  onSubmit: () => void;
}

export default function ResetPasswordForm({ onSubmit, loading }: Props) {
  function handleSubmit() {
    onSubmit();
  }

  return (
    <View style={styles.container}>
      <View>
        <ThemedText style={styles.title} type="title">
          Forgot Password
        </ThemedText>
      </View>
      {/* Form */}
      <Form onSubmit={handleSubmit} style={styles.form}>
        <View style={styles.formGroup}>
          <ThemedTextInput label="ID NO" placeholder="Type ID No" required />
          <ThemedTextInput
            label="New Password"
            placeholder="Password"
            secureTextEntry={true}
            required
          />
          <ThemedTextInput
            label="Confirm password"
            placeholder="Password"
            secureTextEntry={true}
            required
          />
        </View>
        <View style={styles.btnContainer}>
          <ThemedButton
            style={styles.btn}
            variant="default"
            icon={{ name: "key", size: 16 }}
            textStyle={{ fontSize: 14, lineHeight: 16 }}
            disabled={loading}
            loading={loading}
          >
            Submit
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
