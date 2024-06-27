import { MouseEvent, useRef, useState } from "react";

export const useMouseMove = () => {
  const isReadyMoveRef = useRef(false);

  const relativePosition = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const changePosition = (x: number, y: number) => {
    setPosition({ x, y });
  };

  const moveToScreenCenter = (xModifier = 0, yModifier = 0) => {
    setPosition({
      x: window.innerWidth / 2 + xModifier,
      y: window.innerHeight / 2 + yModifier,
    });
  };

  const startMove = ({ clientX, clientY }: MouseEvent) => {
    console.log(position);
    relativePosition.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };

    isReadyMoveRef.current = true;
  };

  const mouseMoving = ({ clientX, clientY }: MouseEvent) => {
    if (!isReadyMoveRef.current) return;

    changePosition(
      clientX - relativePosition.current.x,
      clientY - relativePosition.current.y
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
