import { StyleSheet, View, ViewStyle } from "react-native";
import { ThemedButton } from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import { SwipeModal } from "../SwipeModal";
import OTPInput from "../Form/OTPInput";

interface Props {
  loading?: boolean;
  style?: ViewStyle;
  show: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function OTPForm({
  onSubmit,
  onCancel,
  loading,
  style,
  show,
}: Props) {
  function handleSubmit() {
    onSubmit();
  }

  return (
    <SwipeModal visible={show} allowDismiss={false} onDismiss={onCancel}>
      <View style={[styles.container, style]}>
        <View>
          <ThemedText style={styles.title} type="title">
            OTP VERIFICATION
          </ThemedText>
        </View>
        <View>
          <View style={{ paddingVertical: 25, alignItems: "center" }}>
            <OTPInput />
          </View>
          <View style={styles.btnContainer}>
            <ThemedButton
              style={styles.btn}
              variant="default"
              icon={{ name: "key", size: 16 }}
              textStyle={{ fontSize: 14, lineHeight: 16 }}
              disabled={loading}
              loading={loading}
              onPress={handleSubmit}
            >
              Verify
            </ThemedButton>
          </View>
        </View>
        {/* Form */}
        {/* <Form onSubmit={handleSubmit} style={styles.form}>
          <View style={styles.formGroup}>
            <ThemedTextInput
              label="OTP"
              placeholder="OTP sent to mobile number"
              required
              keyboardType="number-pad"
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
              Verify
            </ThemedButton>
          </View>
        </Form> */}
      </View>
    </SwipeModal>
  );
}
const styles = StyleSheet.create({
  container: { paddingHorizontal: 30, paddingVertical: 20 },
  title: {
    textAlign: "center",
  },
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
