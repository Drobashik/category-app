import classNames from "classnames";
import { FunctionComponent } from "react";

type Props = {
  position: "top" | "bottom" | "central";
  type?: "transparent";
  transparentPosition?: "left" | "right";
};

export const Line: FunctionComponent<Props> = ({
  position,
  type,
  transparentPosition,
}) => {
  return (
    <div
      className={classNames("line", `line--${position}`, {
        "line--transparent": type,
        [`line--transparent-${transparentPosition}`]: type,
      })}
    />
  );
};
