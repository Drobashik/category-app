import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import { useCategory } from "../../hooks/useCategory";
import { useFocus } from "../../hooks/useFocus";
import { useSidePanel } from "../../hooks/useSidePanel";

import { isMobile } from "../../helpers";
import { SIDE_PANEL_SIZE, zoomOptions } from "../../constants";

import { HeadPanel } from "../HeadPanel";
import { CategoryNode } from "../CategoryNode";
import { Draggable } from "../Draggable";
import { SidePanel } from "../SidePanel";
import { CategoryListContainer } from "../CategoryList/CategoryListContainer";

import { Button } from "../shared/Button";
import { CenterSVG } from "../shared/SvgIcon/Icons";
import { Dialog } from "../shared/Dialog";
import { useDialog } from "../../hooks/useDialog";
import { Select } from "../shared/Select";
import { useZoom } from "../../hooks/useZoom";

export const Container = () => {
  const { isPanelOpen, handlePanelOpen, handlePanelClose } = useSidePanel();

  const { changeFocus } = useFocus(
    isPanelOpen && !isMobile(),
    SIDE_PANEL_SIZE / 2
  );

  const moveToCenter = () => {
    changeFocus(category.id);
  };

  const { category, ...actions } = useCategory(changeFocus);

  const [selectValue, setSelectValue] = useState(100);

  const { zoom, zoomIn, zoomOut, changeZoom, changeWheelZoom } = useZoom();

  const handleSelectZoomChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const zoomValue = +event.target.value / 100; // Here 100 is converter to the scale units

    changeZoom(zoomValue);
  };

  const { isDialogOpen, openDialog, closeDialog } = useDialog();

  const receivedId = useRef(0);

  const handleDeleteModal = useCallback((id: number) => {
    openDialog();
    receivedId.current = id;
  }, []);

  const handleDeleteConfirmation = () => {
    actions.remove(receivedId.current);
    closeDialog();
  };

  useEffect(() => {
    const correctOption = zoomOptions.find((option) => {
      const diff = Math.round(zoom * 100) - option.value;
      if (diff < 25 && diff > -25) {
        return option;
      }
    });

    setSelectValue(correctOption?.value ?? 0);
  }, [zoom]);

  return (
    <div className="container">
      <SidePanel isOpen={isPanelOpen}>
        <CategoryListContainer
          category={category}
          onPanelClose={handlePanelClose}
          onFocus={changeFocus}
          findCategory={actions.find}
        />
      </SidePanel>

      <HeadPanel>
        <Button onClick={zoomIn}>+</Button>
        <Select
          value={selectValue}
          onChange={handleSelectZoomChange}
          options={zoomOptions}
        />
        <Button onClick={zoomOut}>-</Button>
        <Button onClick={moveToCenter}>
          <CenterSVG />
        </Button>
        <Button variant="blue" onClick={handlePanelOpen}>
          List view
        </Button>
      </HeadPanel>

      <Draggable zoom={zoom} onZoomWheel={changeWheelZoom}>
        <CategoryNode
          category={category}
          onOpenModal={handleDeleteModal}
          {...actions}
        />
      </Draggable>

      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Delete element"
      >
        <div className="modal">
          <div className="modal_content">
            <p>Are you sure you want to delete the category?</p>
            <p>All nested categories will be deleted too!</p>
          </div>
          <div className="modal_footer">
            <Button variant="light" onClick={closeDialog}>
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
