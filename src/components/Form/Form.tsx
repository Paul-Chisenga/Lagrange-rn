import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { View, ViewProps } from "react-native";
import { ThemedInputProps, ThemedTextInput } from "../ThemedTextInput";
import { ThemedButton, ThemedButtonProps } from "../ThemedButton";

import * as Crypto from "expo-crypto";
import { ThemedCheckBox, ThemedCheckProps } from "../ThemedCheckBox";

type ValidationMeta = {
  id: string;
  required: boolean;
};

interface Props extends ViewProps {
  onSubmit?: () => void;
}

const createInitialState = (node: ReactNode) => {
  const fs: ValidationMeta[] = [];
  for (const child of Children.toArray(node)) {
    if (isValidElement<PropsWithChildren>(child)) {
      if (
        isValidElement<ThemedInputProps>(child) &&
        Object.is(child.type, ThemedTextInput)
      ) {
        fs.push({
          id: Crypto.randomUUID(),
          required: !!child.props.required,
        });
      }
      if (
        isValidElement<ThemedCheckProps>(child) &&
        Object.is(child.type, ThemedCheckBox)
      ) {
        fs.push({
          id: Crypto.randomUUID(),
          required: !!child.props.required,
        });
      }
      // look into children components
      const children = child.props.children;
      if (children) {
        fs.push(...createInitialState(children));
      }
    }
  }
  return fs;
};

export const Form = forwardRef<View, Props>(function (
  { children, onSubmit, ...rest },
  ref
) {
  let fields = useRef(
    createInitialState(children).map((fl) => ({
      ...fl,
      value: "",
      bound: false,
    }))
  ).current;

  const [messages, setMessages] = useState(
    fields.map((fl) => ({ id: fl.id, message: "" }))
  );

  const handleValueChange = useCallback((fieldId: string, text: string) => {
    const field = fields.find((fl) => fl.id === fieldId);
    if (field) {
      field.value = text;
    }
  }, []);

  const handleSubmit = useCallback(() => {
    //  Validate inputs
    let valid = true;
    for (const field of fields) {
      // required validate
      const clone = [...messages];
      const f = messages.find((fl) => fl.id === field?.id)!;
      if (field.required && !field.value) {
        f.message = "This field is required";
        valid = false;
      } else {
        f.message = "";
      }
      setMessages(clone);
    }

    if (onSubmit && valid) {
      onSubmit();
    }
  }, [onSubmit]);

  const getField = () => {
    if (fields.filter((fl) => fl.bound).length === fields.length) {
      fields = fields.map((fl) => ({ ...fl, bound: false }));
    }
    const field = fields.find((fl) => !fl.bound);
    if (!field) {
      throw new Error("Error computing the form");
    }
    field.bound = true;
    return field;
  };

  const modifyChildren = useCallback((node: ReactNode): ReactNode => {
    return Children.map(node, (child) => {
      // if it's an element proceed to tranformation
      // else return the element
      if (isValidElement<PropsWithChildren>(child)) {
        // if text input
        if (
          isValidElement<ThemedInputProps>(child) &&
          Object.is(child.type, ThemedTextInput)
        ) {
          const field = getField();
          return cloneElement(child, {
            message: messages.find((msg) => msg.id === field.id)?.message,
            onSubmitEditing: handleSubmit,
            onValueChange(text: string) {
              handleValueChange(field.id, text);
            },
          });
        }
        // if checkbox
        if (
          isValidElement<ThemedCheckProps>(child) &&
          Object.is(child.type, ThemedCheckBox)
        ) {
          const field = getField();
          return cloneElement(child, {
            message: messages.find((msg) => msg.id === field.id)?.message,
            onToggleState(checked: boolean) {
              handleValueChange(field.id, checked ? "checked" : "");
            },
          });
        }
        // check for button with submit property
        else if (
          isValidElement<ThemedButtonProps>(child) &&
          Object.is(child.type, ThemedButton)
          //   !child.props.button
        ) {
          return cloneElement(child, {
            onPress: handleSubmit,
          });
        }
        // if has children call function for each child again
        // else check if it's a form element
        if (child.props.children) {
          const children = modifyChildren(child.props.children);
          return cloneElement(child, {}, children);
        }
      }
      return child;
    });
  }, []);

  return (
    <View ref={ref} {...rest}>
      {modifyChildren(children)}
    </View>
  );
});
