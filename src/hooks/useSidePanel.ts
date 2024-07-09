import { useCallback, useState } from "react";
import { usePositionContext } from "../context/positionContext";
import { isMobile, setupTransitionAnimation } from "../helpers";
import { DRAGGABLE_ITEM_ID, SIDE_PANEL_SIZE } from "../constants";

export const useSidePanel = () => {
  const [isPanelOpen, setPanelOpen] = useState(false);

  const { elementPosition, changeElementPosition } = usePositionContext();

  const handlePanelOpen = () => {
    setPanelOpen((prev) => !prev);

    if (isMobile()) return;

    const panelOffset = SIDE_PANEL_SIZE / 2;
    const modifierX = isPanelOpen ? -panelOffset : panelOffset;

    setupTransitionAnimation(DRAGGABLE_ITEM_ID, 500);

    changeElementPosition(elementPosition.x + modifierX, elementPosition.y);
  };

  const handlePanelClose = useCallback(() => {
    setPanelOpen(false);
  }, []);

  return { isPanelOpen, handlePanelOpen, handlePanelClose };
};
