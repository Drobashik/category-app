import classNames from "classnames";
import { FunctionComponent, InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLSelectElement>, "id" | "name">;

export const Select: FunctionComponent<Props> = ({
  className,
  ...restProps
}) => {
  return (
    <label htmlFor="select_1" className={classNames("select", className)}>
      <select
        {...restProps}
        className="select_input"
        id="select_1"
        name="select_1"
      >
        <option value="25">25%</option>
        <option value="50">50%</option>
        <option value="75">75%</option>
        <option value="100">100%</option>
        <option value="125">125 %</option>
        <option value="150">150 %</option>
        <option value="175">175 %</option>
        <option value="200">200 %</option>
        <option value="225">225 %</option>
      </select>
    </label>
  );
};
