import { useCallback, useLayoutEffect, useState } from "react";
import { usePositionContext } from "../context/positionContext";
import { getModifiedPosition } from "../helpers";

export const useFocus = (conditionToModify = false, modifier = 0) => {
  const [focusedId, setFocusedId] = useState(0);

  const { elementPosition, changeElementPosition } = usePositionContext();

  const changeFocus = useCallback((id: number) => {
    setFocusedId(id);
  }, []);

  useLayoutEffect(() => {
    const focusElement = document.getElementById(`el-${focusedId}`);

    if (!focusElement) return;

    const { x, y, width, height } = focusElement.getBoundingClientRect();

    const modifiedPositionX = getModifiedPosition(
      "x",
      elementPosition,
      conditionToModify,
      modifier
    );

    changeElementPosition(
      modifiedPositionX + window.innerWidth / 2 - x - width / 2,
      elementPosition.y + window.innerHeight / 2 - y - height / 2
    );

    focusElement.focus({
      preventScroll: true,
    });

    setFocusedId(0);
  }, [focusedId]);

  return { changeFocus };
};
