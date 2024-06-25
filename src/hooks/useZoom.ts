import { WheelEvent, useState } from "react";
import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from "../constants";

let scrolled = true;

export const useZoom = (
  position: { x: number; y: number },
  changePosition: (x: number, y: number) => void,
  isRelativeToCursor = true
) => {
  const [zoom, setZoom] = useState(1);

  const zoomChange = (event: WheelEvent) => {
    if (scrolled) {
      const zoomDirection = Math.sign(event.deltaY * -1);

      const newZoom = zoom + zoomDirection * ZOOM_STEP;

      if (newZoom < MIN_ZOOM || newZoom > MAX_ZOOM) {
        return;
      }

      const relX = isRelativeToCursor ? event.clientX : window.innerWidth / 2;
      const relY = isRelativeToCursor ? event.clientY : window.innerHeight / 2;

      const scaleFactor = newZoom / zoom;

      const newPosX = (position.x - relX) * scaleFactor + relX;
      const newPosY = (position.y - relY) * scaleFactor + relY;

      setZoom(newZoom);
      changePosition(newPosX, newPosY);

      scrolled = false;

      setTimeout(() => {
        scrolled = true;
      }, 500);
    }
  };

  return {
    zoom,
    zoomChange,
  };
};
