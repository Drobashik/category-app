import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classnames from "classnames";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role"> & {
  buttonType?: "default" | "icon";
  variant?: "light" | "blue" | "greyed" | "success" | "info" | "error";
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  buttonType = "default",
  variant = "light",
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={classnames(
        "button",
        `button--${buttonType}`,
        `button--${variant}`
      )}
      role="button"
      onMouseDown={(event) => event.stopPropagation()}
    >
      {children}
    </button>
  );
};
