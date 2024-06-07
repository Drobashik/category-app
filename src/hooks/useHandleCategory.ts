import { categoryData } from "../__mocks__/catrgoryData";
import { HandlerCategory } from "../lib/HandlerCategory";

const handlerCategory = new HandlerCategory(categoryData);

export const useHandleCategory = (
  clickedId: number,
  onCategoryChange: (action: () => void) => void
) => {
  const handleAdd = () => {
    onCategoryChange(() => {
      handlerCategory.add(
        {
          value: "",
          editable: true,
          id: Date.now(),
          subCategories: [],
          new: true,
        },
        clickedId
      );
    });
  };

  const handleCancel = () => {
    onCategoryChange(() => {
      handlerCategory.cancel(clickedId);
    });
  };

  const handleEdit = () => {
    onCategoryChange(() => {
      handlerCategory.edit(clickedId);
    });
  };

  const handleConfirm = (editedValue: string) => {
    onCategoryChange(() => {
      handlerCategory.confirm(editedValue, clickedId);
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
    handleCancel,
    handleConfirm,
    handleRemove,
  };
};
