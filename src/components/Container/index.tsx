import { CategoryContainer } from "../Category/CategoryContainer";
import { useMouseMove } from "../../hooks/useMouseMove";

export const Container = () => {
  const { postition, handleStartMove, handleMoving, handleStopMove } =
    useMouseMove();

  return (
    <div
      className="container"
      onMouseLeave={handleStopMove}
      onMouseUp={handleStopMove}
      onMouseMove={handleMoving}
    >
      <CategoryContainer onMouseDown={handleStartMove} style={postition} />
    </div>
  );
};
