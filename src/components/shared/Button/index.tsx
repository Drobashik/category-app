import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classnames from "classnames";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role"> & {
  buttonType?: "default" | "icon";
  variant?: "greyed" | "success" | "info" | "error";
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  buttonType = "default",
  variant = "success",
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
