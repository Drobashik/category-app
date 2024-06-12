import { useEffect, useState } from "react";
import { useMouseMove } from "../../hooks/useMouseMove";
import { HeadPanel } from "../HeadPanel";
import { categoryData } from "../../__mocks__/catrgoryData";
import { Category } from "../Category";

export const Container = () => {
  const [category, setCategory] = useState(categoryData);

  const [newCategoryID, setNewCategoryID] = useState<number>(0);

  const handleCategoryChange = (action: () => number | void) => {
    /* TODO: rewrite current logic with clicked ID 
    to check if element exists {id: 123, exists: false} */

    const newID = action();

    if (newID) {
      setNewCategoryID(newID);
    }

    setCategory({ ...categoryData });
  };

  const {
    position,
    handlePostition,
    handleStartMove,
    handleMoving,
    handleStopMove,
  } = useMouseMove();

  useEffect(() => {
    /* TODO: move this logic to separate function */
    if (newCategoryID === 0) return;

    const element = document.getElementById(`el-${newCategoryID}`);
    const boundRect = element?.getBoundingClientRect();

    const posX = boundRect?.x ?? 0;
    const posY = boundRect?.y ?? 0;

    const width = boundRect?.width ?? 0;
    const height = boundRect?.height ?? 0;

    handlePostition(
      position.x + window.innerWidth / 2 - posX - width / 2,
      position.y + window.innerHeight / 2 - posY - height / 2
    );

    (element?.firstElementChild as HTMLInputElement).focus({
      preventScroll: true,
    });
  }, [newCategoryID]);

  return (
    <div className="container">
      <HeadPanel onPositionChange={handlePostition} />
      <div
        className="category-field"
        onMouseLeave={handleStopMove}
        onMouseUp={handleStopMove}
        onMouseMove={handleMoving}
      >
        <div
          className="category-draggable"
          onMouseDown={handleStartMove}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <Category
            category={category}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
    </div>
  );
};
