import { FormData } from "@/lib/types";
import { useEffect, useState } from "react";

export type FormValidator = Record<string, () => boolean>;

// This function will recursively look for a custom component with the formData, formValidator and handleFormSubmit props
// in the input component tree from child to parent
// these props will then be programmatically connected to an form control
export function findFormObjects(fiberNode?: { return: any }): {
  formData: FormData;
  formValidator: FormValidator;
  handleFormSubmit: () => void;
} | null {
  let returnNode = fiberNode?.return;
  while (returnNode) {
    const props = returnNode.memoizedProps;
    if (props?.formData && props?.formValidator && props?.handleFormSubmit) {
      return {
        formData: props.formData,
        formValidator: props.formValidator,
        handleFormSubmit: props.handleFormSubmit,
      };
    }
    returnNode = returnNode.return;
  }

  return null;
}

export default function useForm(ref: any, { set }: { set: boolean }) {
  const [formObjects, setFormObjects] = useState<ReturnType<
    typeof findFormObjects
  > | null>(null);

  useEffect(() => {
    // find form objects if the input is nested into a Form component tree
    if (set) {
      setFormObjects(findFormObjects(ref.current?.__internalInstanceHandle));
    }
  }, []);

  return { formObjects };
}
