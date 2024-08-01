import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ThemedTextInput } from "../ThemedTextInput";
import { ThemedButton } from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import { Form } from "../Form/Form";
import { ThemedCheckBox } from "../ThemedCheckBox";
import { Colors } from "@/constants/Colors";

interface Props {
  loading?: boolean;
  onSwitchToLogin: () => void;
  onSubmit: () => void;
}

export default function SignUpForm({
  onSwitchToLogin,
  onSubmit,
  loading,
}: Props) {
  function handleSubmit() {
    onSubmit();
  }

  return (
    <View style={styles.container}>
      <View>
        <ThemedText style={styles.title} type="title">
          Sign Up
        </ThemedText>
        <ThemedText style={styles.description}>
          Already have an account ?{" "}
          <Text style={{ color: "red" }} onPress={onSwitchToLogin}>
            Login
          </Text>
        </ThemedText>
      </View>
      {/* Form */}
      <ScrollView style={{ flex: 1 }}>
        <Form onSubmit={handleSubmit} style={styles.form}>
          <View style={styles.formGroup}>
            <ThemedTextInput
              label="Full Name"
              placeholder="Type your full name"
              required
            />
            <ThemedTextInput label="ID NO" placeholder="Type ID No" required />
            <ThemedTextInput
              label="Email"
              keyboardType="email-address"
              placeholder="Your email address"
              required
            />
            <ThemedTextInput label="Phone" placeholder="254" required />
            <ThemedTextInput
              label="Password"
              placeholder="Password"
              secureTextEntry={true}
              required
            />
            <ThemedTextInput
              label="Confirm Password"
              placeholder="Password"
              secureTextEntry={true}
              required
            />
            <ThemedCheckBox required>
              I have read and agree to the
              <ThemedText style={{ color: Colors.light.tint.default }}>
                LaGrange Terms of Use
              </ThemedText>
              and
              <ThemedText style={{ color: Colors.light.tint.default }}>
                Privacy policy
              </ThemedText>
            </ThemedCheckBox>
          </View>
          <View style={styles.btnContainer}>
            <ThemedButton
              style={styles.btn}
              variant="default"
              icon={{ name: "person-add", size: 16 }}
              textStyle={{ fontSize: 14, lineHeight: 16 }}
              disabled={loading}
              loading={loading}
            >
              Sign Up
            </ThemedButton>
          </View>
        </Form>
      </ScrollView>
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
