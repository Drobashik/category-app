import { MouseEvent, useRef, useState } from "react";
import { CENTRAL_POSITION } from "../constants";

export const useMouseMove = () => {
  const isReadyMoveRef = useRef(false);

  const [parallelPos, setParallelPos] = useState({ x: 0, y: 0 });

  const [position, setPosition] = useState(CENTRAL_POSITION);

  const changePosition = (x: number, y: number) => {
    setPosition({ x, y });
  };

  const moveToScreenCenter = () => {
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  };

  const startMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
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

    isReadyMoveRef.current = true;
  };

  const mouseMoving = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    if (!isReadyMoveRef.current) return;

    const targeted = (currentTarget as HTMLDivElement)
      .firstElementChild as HTMLDivElement;
    const parent = (currentTarget as HTMLDivElement)
      .parentElement as HTMLDivElement;

    changePosition(
      clientX - parent.offsetLeft - (targeted.offsetWidth - parallelPos.x),
      clientY - parent.offsetTop - (targeted.offsetHeight - parallelPos.y)
    );
  };

  const stopMove = () => {
    isReadyMoveRef.current = false;
  };

  return {
    position,
    changePosition,
    moveToScreenCenter,
    startMove,
    mouseMoving,
    stopMove,
  };
};
