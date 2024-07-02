import { useCallback, useState } from "react";
import { usePositionContext } from "../context/positionContext";
import { isMobile } from "../helpers";
import { SIDE_PANEL_SIZE } from "../constants";

export const useListPanel = () => {
  const [isListOpen, setListOpen] = useState(false);

  const { elementPosition, changeElementPosition } = usePositionContext();

  const handleListOpen = () => {
    setListOpen((prev) => !prev);

    if (isMobile()) return;

    const panelOffset = SIDE_PANEL_SIZE / 2;
    const modifierX = isListOpen ? -panelOffset : panelOffset;

    changeElementPosition(elementPosition.x + modifierX, elementPosition.y);
  };

  const handleListClose = useCallback(() => {
    setListOpen(false);
  }, []);

  return { isListOpen, handleListOpen, handleListClose };
};
