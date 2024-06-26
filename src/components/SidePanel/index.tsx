import classNames from "classnames";
import { FunctionComponent, PropsWithChildren } from "react";

type Props = {
  isOpen: boolean;
};

export const SidePanel: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  isOpen,
}) => {
  return (
    <div
      className={classNames("side-panel", {
        "side-panel--open": isOpen,
      })}
    >
      <div className="side-panel_content">{children}</div>
    </div>
  );
};
