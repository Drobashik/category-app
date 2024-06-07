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
        <CategoryContainer onMouseDown={handleStartMove} style={postition} />
      </div>
    </div>
  );
};
