import { CategoryContainer } from "../Category/CategoryContainer";
import { useMouseMove } from "../../hooks/useMouseMove";
import { HeadPanel } from "../HeadPanel";

export const Container = () => {
  const { postition, handleStartMove, handleMoving, handleStopMove } =
    useMouseMove();

  return (
    <div className="container">
      <HeadPanel />
      <div
        className="category-field"
        onMouseLeave={handleStopMove}
        onMouseUp={handleStopMove}
        onMouseMove={handleMoving}
      >
        <div
          className="category-draggable"
          onMouseDown={handleStartMove}
          style={postition}
        >
          <CategoryContainer />
        </div>
      </div>
    </div>
  );
};
