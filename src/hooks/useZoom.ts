import { MouseEvent, WheelEvent, useState } from "react";
import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from "../constants";
import { usePositionContext } from "../context/positionContext";

export const useZoom = () => {
  const [zoom, setZoom] = useState(1);

  const { elementPosition, changeElementPosition } = usePositionContext();

  const changeZoom = (zoomValue: number, event?: MouseEvent) => {
    const relX = event?.clientX ?? window.innerWidth / 2;
    const relY = event?.clientY ?? window.innerHeight / 2;

    const scaleFactor = zoomValue / zoom;

    const { x, y } = elementPosition;

    setZoom(() => zoomValue);

    changeElementPosition(
      (x - relX) * scaleFactor + relX,
      (y - relY) * scaleFactor + relY
    );
  };

  const zoomIn = () => {
    if (zoom > MAX_ZOOM - ZOOM_STEP) return;

    changeZoom(zoom + ZOOM_STEP);
  };

  const zoomOut = () => {
    if (zoom < MIN_ZOOM + ZOOM_STEP) return;

    changeZoom(zoom - ZOOM_STEP);
  };

  const changeWheelZoom = (event: WheelEvent) => {
    const zoomDirection = Math.sign(event.deltaY * -1);

    const newZoom = zoom + (zoomDirection * ZOOM_STEP) / 5;

    if (newZoom < MIN_ZOOM || newZoom > MAX_ZOOM) {
      return;
    }

    changeZoom(newZoom, event);
  };

  return {
    zoom,
    zoomIn,
    zoomOut,
    changeZoom,
    changeWheelZoom,
  };
};
