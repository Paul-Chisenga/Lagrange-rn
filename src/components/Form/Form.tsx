import { FormValidator } from "@/hooks/useForm";
import { useCallback } from "react";
import { View, ViewProps } from "react-native";
import { FormData } from "@/lib/types";

interface FormProps extends ViewProps {
  onSubmit?: (data: any) => void;
}

export const Form = ({ children, onSubmit, ...rest }: FormProps) => {
  const formData: FormData = {};
  const formValidator: FormValidator = {};

  const handleFormSubmit = useCallback(() => {
    const valid = Object.values(formValidator).map((validator) => validator());
    if (!valid.includes(false)) {
      onSubmit && onSubmit(formData);
    }
  }, [onSubmit]);

  return (
    <View {...rest}>
      <Wrapper
        formData={formData}
        formValidator={formValidator}
        handleFormSubmit={handleFormSubmit}
      >
        {children}
      </Wrapper>
    </View>
  );
};

function Wrapper({ children }: any) {
  return children;
}
