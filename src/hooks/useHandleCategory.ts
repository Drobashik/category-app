import { HandlerCategory } from "../lib/HandlerCategory";
import { CategoryType } from "../types/Category.type";

export const useHandleCategory = (
  clickedId: number,
  handlerCategory: HandlerCategory,
  onCategoryChange: (action: () => void) => void
) => {
  const handleAdd = (createdCategory: CategoryType) => {
    onCategoryChange(() => {
      handlerCategory.add(createdCategory, clickedId);
    });
  };

  const handleEdit = () => {
    onCategoryChange(() => {
      handlerCategory.edit(clickedId);
    });
  };

  const handleConfirm = (editedCategory: CategoryType) => {
    onCategoryChange(() => {
      handlerCategory.confirm(editedCategory, clickedId);
    });
  };

  const handleRemove = () => {
    onCategoryChange(() => {
      handlerCategory.delete(clickedId);
    });
  };

  return {
    handleAdd,
    handleEdit,
    handleConfirm,
    handleRemove,
  };
};
