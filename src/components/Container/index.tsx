import { useCallback, useState } from "react";
import { useMouseMove } from "../../hooks/useMouseMove";
import { HeadPanel } from "../HeadPanel";
import { categoryData } from "../../__mocks__/categoryData";
import { Category } from "../Category";
import { Button } from "../shared/Button";
import { CenterSVG } from "../shared/SvgIcon/Icons";
import { Draggable } from "../Draggable";
import { useFocus } from "../../hooks/useFocus";
import { Dialog } from "../shared/Dialog";
import { useHandleCategory } from "../../hooks/useHandleCategory";

export const Container = () => {
  const [category, setCategory] = useState(categoryData);

  const [idToDelete, setIdToDelete] = useState(0);

  const [isOpen, setOpen] = useState(false);

  const {
    position,
    changePosition,
    moveToScreenCenter,
    startMove,
    mouseMoving,
    stopMove,
  } = useMouseMove();

  const { changeFocusedId } = useFocus(position, changePosition);

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

  const handleDeleteConfirmation = () => {
    deleteCategory();
    setCategory({ ...categoryData });
    setOpen(false);
  };

  const handleOpenDialog = (idToDelete: number) => {
    setOpen(true);
    setIdToDelete(idToDelete);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <HeadPanel>
        <Button onClick={moveToScreenCenter}>
          <CenterSVG />
        </Button>
        <Button variant="blue">List</Button>
      </HeadPanel>

      <Draggable
        position={position}
        onStartMove={startMove}
        onMoving={mouseMoving}
        onStopMoving={stopMove}
      >
        <Category
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
