import { MouseEvent, useState } from "react";
import { CENTRAL_POSITION } from "../constants";

export const useMouseMove = () => {
  const [isReadyMove, setReadyMove] = useState(false);

  const [parallelPos, setParallelPos] = useState({ x: 0, y: 0 });

  const [position, setPosition] = useState(CENTRAL_POSITION);

  const handlePostition = (x: number, y: number) => {
    setPosition({ x, y });
  };

  const handleStartMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const targeted = currentTarget as HTMLDivElement;
    const parent = targeted.parentElement as HTMLDivElement;

    setParallelPos({
      x:
        (clientX -
          targeted.offsetLeft -
          parent.offsetLeft -
          targeted.offsetWidth) *
        -1,
      y:
        (clientY -
          targeted.offsetTop -
          parent.offsetTop -
          targeted.offsetHeight) *
        -1,
    });

    setReadyMove(true);
  };

  const handleMoving = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    if (!isReadyMove) return;

    const targeted = (currentTarget as HTMLDivElement)
      .firstElementChild as HTMLDivElement;
    const parent = (currentTarget as HTMLDivElement)
      .parentElement as HTMLDivElement;

    handlePostition(
      clientX - parent.offsetLeft - (targeted.offsetWidth - parallelPos.x),
      clientY - parent.offsetTop - (targeted.offsetHeight - parallelPos.y)
    );
  };

  const handleStopMove = () => {
    setReadyMove(false);
  };

  return {
    postition: { left: `${position.x}px`, top: `${position.y}px` },
    handlePostition,
    handleStartMove,
    handleMoving,
    handleStopMove,
  };
};
