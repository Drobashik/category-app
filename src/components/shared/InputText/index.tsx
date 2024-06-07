import classNames from "classnames";
import { FunctionComponent, InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const InputText: FunctionComponent<Props> = ({
  className,
  ...restProps
}) => {
  return (
    <input
      {...restProps}
      className={classNames("input-text", className)}
      type="text"
      onMouseDown={(event) => event.stopPropagation()}
      autoFocus
    />
  );
};
