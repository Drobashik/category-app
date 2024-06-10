import { useState } from "react";

import { CategoryContainer } from "../Category/CategoryContainer";
import { HeadPanel } from "../HeadPanel";

import { useMouseMove } from "../../hooks/useMouseMove";
import { INITIAL_CATEGORY_SIZE } from "../../constants";

export const Container = () => {
  const [size, setSize] = useState(INITIAL_CATEGORY_SIZE);

  const {
    position,
    handlePostition,
    handleStartMove,
    handleMoving,
    handleStopMove,
  } = useMouseMove();

  const handleCategorySize = (size: number) => {
    setSize(size);
  };

  return (
    <div className="container">
      <HeadPanel
        size={size}
        onPositionChange={handlePostition}
        onSizeChange={handleCategorySize}
      />
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
            ...position,
            scale: `${size / 100}`,
          }}
        >
          <CategoryContainer />
        </div>
      </div>
    </div>
  );
};
