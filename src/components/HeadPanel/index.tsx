import { FunctionComponent, PropsWithChildren } from "react";

type Props = {
  onPositionChange: (x: number, y: number) => void;
};

export const HeadPanel: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <header className="head-panel">
      <div className="head-panel_title">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6051/6051886.png"
          alt="Logo"
        />
        <h1>Category</h1>
      </div>
      <div className="head-panel_control">{children}</div>
    </header>
  );
};
