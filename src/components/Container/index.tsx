import { useCallback, useRef, useState } from "react";

import { useMouseMove } from "../../hooks/useMouseMove";
import { useHandleCategory } from "../../hooks/useHandleCategory";
import { useFocus } from "../../hooks/useFocus";
import { categoryData } from "../../__mocks__/categoryData";
import { useZoom } from "../../hooks/useZoom";
import { isMobile, getModifiedPosition } from "../../helpers";
import { SIDE_PANEL_SIZE } from "../../constants";

import { HeadPanel } from "../HeadPanel";
import { CategoryNode } from "../CategoryNode";
import { Draggable } from "../Draggable";
import { SidePanel } from "../SidePanel";
import { CategoryListContainer } from "../CategoryList/CategoryListContainer";

import { Button } from "../shared/Button";
import { CenterSVG } from "../shared/SvgIcon/Icons";
import { Dialog } from "../shared/Dialog";

export const Container = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [isListOpen, setListOpen] = useState(false);

  const isListOpenOnDesktop = isListOpen && !isMobile();

  const [category, setCategory] = useState(categoryData);

  const handleCategoryChange = useCallback(
    (action: () => number) => {
      const focusId = action();

      changeFocus(focusId);

      setCategory({ ...categoryData });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category]
  );

  /* Interaction hooks */

  const {
    position,
    changePosition,
    moveToScreenCenter,
    startMove,
    mouseMoving,
    stopMove,
  } = useMouseMove();

  const { zoom, zoomChange } = useZoom(position, changePosition);

  const { changeFocus } = useFocus(
    getModifiedPosition(position, isListOpenOnDesktop, SIDE_PANEL_SIZE / 2),
    changePosition
  );

  const handleMoveToCenterScreen = () => {
    moveToScreenCenter(isListOpenOnDesktop ? SIDE_PANEL_SIZE / 2 : 0);
  };

  const handleListOpen = () => {
    setListOpen((prev) => {
      const newPrev = !prev;

      if (isMobile()) return newPrev;

      const panelOffset = SIDE_PANEL_SIZE / 2;
      const modifierX = newPrev ? panelOffset : -panelOffset;
      changePosition(position.x + modifierX, position.y);

      return newPrev;
    });
  };

  const handleListClose = () => {
    setListOpen(false);
  };

  /* Dialog handling */

  const idToDelete = useRef(0);

  const handleOpenDialog = (id: number) => {
    setDialogOpen(true);
    idToDelete.current = id;
  };

  const { deleteCategory } = useHandleCategory(
    { id: idToDelete.current },
    handleCategoryChange
  );

  const handleDeleteConfirmation = () => {
    deleteCategory();
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="container">
      <SidePanel isOpen={isListOpen}>
        <CategoryListContainer
          category={category}
          onListClose={handleListClose}
          onFocus={changeFocus}
        />
      </SidePanel>

      <HeadPanel>
        <Button onClick={handleMoveToCenterScreen}>
          <CenterSVG />
        </Button>
        <Button variant="blue" onClick={handleListOpen}>
          List view
        </Button>
      </HeadPanel>

      <Draggable
        zoom={zoom}
        position={position}
        onStartMove={startMove}
        onMoving={mouseMoving}
        onStopMoving={stopMove}
        onZoom={zoomChange}
      >
        <CategoryNode
          category={category}
          onCategoryChange={handleCategoryChange}
          onOpenDialog={handleOpenDialog}
        />
      </Draggable>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Delete element"
      >
        <div className="modal">
          <div className="modal_content">
            <p>Are you sure you want to delete the category?</p>
            <p>All nested categories will be deleted too!</p>
          </div>
          <div className="modal_footer">
            <Button variant="light" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant="error" onClick={handleDeleteConfirmation}>
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
