import { WheelEvent, useState } from "react";
import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from "../constants";
import { usePositionContext } from "../context/positionContext";

let scrolled = true;

export const useZoom = (isRelativeToCursor = true) => {
  const [zoom, setZoom] = useState(1);

  const { elementPosition, changeElementPosition } = usePositionContext();

  const changeZoom = (event: WheelEvent) => {
    if (scrolled) {
      const zoomDirection = Math.sign(event.deltaY * -1);

      const newZoom = zoom + zoomDirection * ZOOM_STEP;

      if (newZoom < MIN_ZOOM || newZoom > MAX_ZOOM) {
        return;
      }

      const relX = isRelativeToCursor ? event.clientX : window.innerWidth / 2;
      const relY = isRelativeToCursor ? event.clientY : window.innerHeight / 2;

      const scaleFactor = newZoom / zoom;

      const newPosX = (elementPosition.x - relX) * scaleFactor + relX;
      const newPosY = (elementPosition.y - relY) * scaleFactor + relY;

      setZoom(newZoom);
      changeElementPosition(newPosX, newPosY);

      scrolled = false;

      setTimeout(() => {
        scrolled = true;
      }, 300);
    }
  };

  return {
    zoom,
    changeZoom,
  };
};
