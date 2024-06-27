import { useEffect, useState } from "react";

export const useFocus = (
  position: { x: number; y: number },
  changePosition: (x: number, y: number) => void
) => {
  const [focusedId, setFocusedId] = useState(0);

  const changeFocus = (id: number) => {
    setFocusedId(id);
  };

  useEffect(() => {
    const element = document.getElementById(`el-${focusedId}`);

    if (!element) return;

    const { x, y, width, height } = element.getBoundingClientRect();

    changePosition(
      position.x + window.innerWidth / 2 - x - width / 2,
      position.y + window.innerHeight / 2 - y - height / 2
    );

    (element.firstElementChild as HTMLInputElement).focus({
      preventScroll: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedId]);

  return { changeFocus };
};
