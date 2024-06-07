import { ChangeEvent, useState } from "react";

export const useInputText = (defaultValue: string) => {
  const [editedValue, setEditedValue] = useState(defaultValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value);
  };

  return { editedValue, handleInputChange };
};
