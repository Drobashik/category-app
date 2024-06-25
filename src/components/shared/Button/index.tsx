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
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={classnames(
        "button",
        `button--${buttonType}`,
        `button--${variant}`,
        className
      )}
      role="button"
      onPointerDown={(event) => event.stopPropagation()}
    >
      {children}
    </button>
  );
};
