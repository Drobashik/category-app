import { useCallback, useState } from "react";
import { useMouseMove } from "../../hooks/useMouseMove";
import { HeadPanel } from "../HeadPanel";
import { categoryData } from "../../__mocks__/catrgoryData";
import { Category } from "../Category";
import { Button } from "../shared/Button";
import { CenterSVG } from "../shared/SvgIcon/Icons";
import { Draggable } from "../Draggable";
import { useFocus } from "../../hooks/useFocus";

export const Container = () => {
  const [category, setCategory] = useState(categoryData);

  const {
    position,
    changePosition,
    moveToScreenCenter,
    startMove,
    mouseMoving,
    stopMove,
  } = useMouseMove();

  const { changeFocusedId } = useFocus(position, changePosition);

  const handleCategoryChange = useCallback(
    (action: () => number) => {
      const focusId = action();

      changeFocusedId(focusId);

      setCategory({ ...categoryData });
    },
    [category]
  );

  return (
    <div className="container">
      <HeadPanel>
        <Button onClick={moveToScreenCenter}>
          <CenterSVG />
        </Button>
        <Button variant="blue">List</Button>
      </HeadPanel>

      <Draggable
        position={position}
        onStartMove={startMove}
        onMoving={mouseMoving}
        onStopMoving={stopMove}
      >
        <Category category={category} onCategoryChange={handleCategoryChange} />
      </Draggable>
    </div>
  );
};
