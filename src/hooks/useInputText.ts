import { ChangeEvent, useState } from "react";

export const useInputText = (defaultValue: string) => {
  const [editedValue, setEditedValue] = useState(defaultValue);

  const handleInputChange = (
    event?: ChangeEvent<HTMLInputElement> | string
  ) => {
    setEditedValue(
      (event as ChangeEvent<HTMLInputElement>)?.target?.value ||
        (event as string)
    );
  };

  return { editedValue, handleInputChange };
};
