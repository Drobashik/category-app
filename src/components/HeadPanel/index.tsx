import { ChangeEvent, FunctionComponent } from "react";

import { MAX_SIZE, MIN_SIZE, SIZE_STEP } from "../../constants";

import { Button } from "../shared/Button";
import { CenterSVG } from "../shared/SvgIcon/Icons";
import { Select } from "../shared/Select";

type Props = {
  size: number;
  onPositionChange: (x: number, y: number) => void;
  onSizeChange: (size: number) => void;
};

export const HeadPanel: FunctionComponent<Props> = ({
  size,
  onPositionChange,
  onSizeChange,
}) => {
  const handleCenterPosition = () => {
    onPositionChange(window.innerWidth / 2, window.innerHeight / 2);
  };

  const handleSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const size = Number(event.target.value);

    onSizeChange(size);
  };

  const increaseSize = () => {
    if (size === MAX_SIZE) return;

    onSizeChange(size + SIZE_STEP);
  };

  const decreaseSize = () => {
    if (size === MIN_SIZE) return;

    onSizeChange(size - SIZE_STEP);
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
        <Button onClick={increaseSize}>+</Button>
        <Select value={size} onChange={handleSize} />
        <Button onClick={decreaseSize}>-</Button>
        <Button onClick={handleCenterPosition}>
          <CenterSVG />
        </Button>
        <Button variant="blue">List</Button>
      </div>
    </header>
  );
};
