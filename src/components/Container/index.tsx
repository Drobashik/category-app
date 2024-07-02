import { useCallback, useRef } from "react";

import { useCategory } from "../../hooks/useCategory";
import { useFocus } from "../../hooks/useFocus";
import { useSidePanel } from "../../hooks/useSidePanel";

import { isMobile } from "../../helpers";
import { SIDE_PANEL_SIZE } from "../../constants";

import { HeadPanel } from "../HeadPanel";
import { CategoryNode } from "../CategoryNode";
import { Draggable } from "../Draggable";
import { SidePanel } from "../SidePanel";
import { CategoryListContainer } from "../CategoryList/CategoryListContainer";

import { Button } from "../shared/Button";
import { CenterSVG } from "../shared/SvgIcon/Icons";
import { Dialog } from "../shared/Dialog";
import { useDialog } from "../../hooks/useDialog";

export const Container = () => {
  const { isPanelOpen, handlePanelOpen, handlePanelClose } = useSidePanel();

  const { changeFocus } = useFocus(
    isPanelOpen && !isMobile(),
    SIDE_PANEL_SIZE / 2
  );

  const { category, ...actions } = useCategory(changeFocus);

  /* Dialog handing */

  const { isDialogOpen, openDialog, closeDialog } = useDialog();

  const receivedId = useRef(0);

  const handleReceiveId = useCallback((id: number) => {
    openDialog();
    receivedId.current = id;
  }, []);

  const handleDeleteConfirmation = () => {
    actions.remove(receivedId.current);
    closeDialog();
  };

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
        <Button onClick={changeFocus.bind(null, category.id)}>
          <CenterSVG />
        </Button>
        <Button variant="blue" onClick={handlePanelOpen}>
          List view
        </Button>
      </HeadPanel>

      <Draggable>
        <CategoryNode
          category={category}
          onReceiveId={handleReceiveId}
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
