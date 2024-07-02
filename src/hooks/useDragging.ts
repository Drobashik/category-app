import { MouseEvent, useRef } from "react";
import { usePositionContext } from "../context/positionContext";

export const useDragging = () => {
  const isReadyMoveRef = useRef(false);

  const relativePosition = useRef({ x: 0, y: 0 });

  const { elementPosition, changeElementPosition } = usePositionContext();

  const dragStart = ({ clientX, clientY }: MouseEvent) => {
    relativePosition.current = {
      x: clientX - elementPosition.x,
      y: clientY - elementPosition.y,
    };

    isReadyMoveRef.current = true;
  };

  const dragging = ({ clientX, clientY }: MouseEvent) => {
    if (!isReadyMoveRef.current) return;

    changeElementPosition(
      clientX - relativePosition.current.x,
      clientY - relativePosition.current.y
    );
  };

  const dragStop = () => {
    isReadyMoveRef.current = false;
  };

  return {
    dragStart,
    dragging,
    dragStop,
  };
};
