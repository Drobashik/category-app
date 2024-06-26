import { useCallback, useState } from "react";

import { useMouseMove } from "../../hooks/useMouseMove";
import { useHandleCategory } from "../../hooks/useHandleCategory";
import { useFocus } from "../../hooks/useFocus";
import { categoryData } from "../../__mocks__/categoryData";

import { HeadPanel } from "../HeadPanel";
import { CategoryNode } from "../CategoryNode";
import { Draggable } from "../Draggable";

import { Button } from "../shared/Button";
import { CenterSVG } from "../shared/SvgIcon/Icons";
import { Dialog } from "../shared/Dialog";
import { useZoom } from "../../hooks/useZoom";
import { CategoryList } from "../CategoryList";
import { SidePanel } from "../SidePanel";

export const Container = () => {
  const [category, setCategory] = useState(categoryData);

  const [idToDelete, setIdToDelete] = useState(0);

  const [isOpen, setOpen] = useState(false);

  const [isListOpen, setListOpen] = useState(false);

  const {
    position,
    changePosition,
    moveToScreenCenter,
    startMove,
    mouseMoving,
    stopMove,
  } = useMouseMove();

  const { changeFocusedId } = useFocus(position, changePosition);

  const { zoom, zoomChange } = useZoom(position, changePosition);

  const handleCategoryChange = useCallback(
    (action: () => number) => {
      const focusId = action();

      changeFocusedId(focusId);

      setCategory({ ...categoryData });
    },
    [category]
  );

  const { deleteCategory } = useHandleCategory(
    { id: idToDelete },
    handleCategoryChange
  );

  const handleOpenDialog = (idToDelete: number) => {
    setOpen(true);
    setIdToDelete(idToDelete);
  };

  const handleDeleteConfirmation = () => {
    deleteCategory();
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <SidePanel isOpen={isListOpen}>
        <CategoryList className="category-list" category={category} />
      </SidePanel>

      <HeadPanel>
        <Button onClick={moveToScreenCenter}>
          <CenterSVG />
        </Button>
        <Button variant="blue" onClick={() => setListOpen((prev) => !prev)}>
          List
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
        isOpen={isOpen}
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
