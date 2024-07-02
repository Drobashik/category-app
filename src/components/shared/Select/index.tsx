import classNames from "classnames";
import { FunctionComponent, InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLSelectElement>, "id" | "name"> & {
  options: {
    value: string;
    label: string;
  }[];
};

export const Select: FunctionComponent<Props> = ({
  className,
  options,
  ...restProps
}) => {
  return (
    <label htmlFor="select" className={classNames("select", className)}>
      <select {...restProps} className="select_input" id="select" name="select">
        {options.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </label>
  );
};
