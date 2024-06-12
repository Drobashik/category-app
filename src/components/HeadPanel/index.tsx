import { FunctionComponent } from "react";

import { Button } from "../shared/Button";
import { CenterSVG } from "../shared/SvgIcon/Icons";

type Props = {
  onPositionChange: (x: number, y: number) => void;
};

export const HeadPanel: FunctionComponent<Props> = ({ onPositionChange }) => {
  const handleCenterPosition = () => {
    onPositionChange(window.innerWidth / 2, window.innerHeight / 2);
  };

  return (
    <header className="head-panel">
      <div className="head-panel_title">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6051/6051886.png"
          alt="Logo"
        />
        <h1>Category</h1>
      </div>
      <div className="head-panel_control">
        <Button onClick={handleCenterPosition}>
          <CenterSVG />
        </Button>
        <Button variant="blue">List</Button>
      </div>
    </header>
  );
};
