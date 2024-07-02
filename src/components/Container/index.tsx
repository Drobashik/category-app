import { useCallback, useRef, useState } from "react";

import { useCategory } from "../../hooks/useCategory";
import { useFocus } from "../../hooks/useFocus";
import { useListPanel } from "../../hooks/useListPanel";

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

export const Container = () => {
  const { isListOpen, handleListOpen, handleListClose } = useListPanel();

  const { changeFocus } = useFocus(
    isListOpen && !isMobile(),
    SIDE_PANEL_SIZE / 2
  );

  const { category, ...actions } = useCategory(changeFocus);

  /* Dialog handing */

  const [isDialogOpen, setDialogOpen] = useState(false);

  const idToDelete = useRef(0);

  const handleOpenDialog = useCallback((id: number) => {
    setDialogOpen(true);
    idToDelete.current = id;
  }, []);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDeleteConfirmation = () => {
    actions.remove(idToDelete.current);
    setDialogOpen(false);
  };

  return (
    <div className="container">
      <SidePanel isOpen={isListOpen}>
        <CategoryListContainer
          category={category}
          onListClose={handleListClose}
          onFocus={changeFocus}
          findCategory={actions.find}
        />
      </SidePanel>

      <HeadPanel>
        <Button onClick={changeFocus.bind(null, category.id)}>
          <CenterSVG />
        </Button>
        <Button variant="blue" onClick={handleListOpen}>
          List view
        </Button>
      </HeadPanel>

      <Draggable>
        <CategoryNode
          category={category}
          onOpenDialog={handleOpenDialog}
          {...actions}
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
