import { View, TextInput } from "react-native";
import { ThemedTextInput } from "../ThemedTextInput";
import { createRef, useEffect, useState } from "react";

interface OPTInputProps {
  ins?: number;
  onChange?: (otp: number | null) => void;
}

export default function OTPInput({ ins = 4, onChange }: OPTInputProps) {
  const [refs] = useState(
    Array(ins)
      .fill(undefined)
      .map(() => createRef<TextInput>())
  );
  const [otp, setOtp] = useState(Array<string>(ins).fill(""));

  useEffect(() => {
    if (!otp.some((value) => !value)) {
      onChange && onChange(+otp.join(""));
    } else {
      onChange && onChange(null);
    }
  }, [otp]);

  return (
    <View style={{ flexDirection: "row", gap: 20 }}>
      {Array.from(Array(ins).keys()).map((_, idx) => (
        <ThemedTextInput
          ref={refs[idx]}
          key={idx}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[idx]}
          onChangeText={(v) => {
            const cpy = [...otp];
            cpy[idx] = v;
            setOtp(cpy);
            if (v && idx !== ins - 1) {
              refs[idx + 1].current?.focus();
            }
          }}
          style={{ textAlign: "center" }}
        />
      ))}
    </View>
  );
}
