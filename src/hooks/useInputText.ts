import { ChangeEvent, useState } from "react";

export const useInputText = (defaultValue = "") => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const changeInputValue = (event: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof event === "string") {
      setInputValue(event);
    } else {
      setInputValue(event.target.value);
    }
  };

  return {
    inputValue,
    changeInputValue,
  };
};
