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
} {
  let returnNode = fiberNode?.return;
  while (returnNode) {
    if (
      returnNode.memoizedProps?.formData &&
      returnNode.memoizedProps?.formValidator &&
      returnNode.memoizedProps?.handleFormSubmit
    ) {
      return returnNode.memoizedProps;
    }
    returnNode = returnNode.return;
  }
  return { formData: {}, formValidator: {}, handleFormSubmit() {} };
}

export default function useForm(ref: any, { set }: { set: boolean }) {
  const [formObjects, setFormObjects] =
    useState<ReturnType<typeof findFormObjects>>();

  useEffect(() => {
    // find form objects if the input is nested into a Form component tree
    if (set) {
      setFormObjects(
        findFormObjects(ref.current?._internalFiberInstanceHandleDEV)
      );
    }
  }, []);

  return { formObjects };
}
