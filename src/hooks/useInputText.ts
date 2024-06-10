import { ChangeEvent, useState } from "react";

export const useInputText = (defaultValue: string) => {
  const [editedValue, setEditedValue] = useState(defaultValue);

  const handleInputChange = (
    event?: ChangeEvent<HTMLInputElement> | string
  ) => {
    setEditedValue(
      (event as ChangeEvent<HTMLInputElement>)?.target?.value ||
        (typeof event === "string" ? (event as string) : "")
    );
  };

  return { editedValue, handleInputChange };
};
