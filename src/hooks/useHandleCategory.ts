import { categoryData } from "../__mocks__/catrgoryData";
import { HandlerCategory } from "../lib/HandlerCategory";

const handlerCategory = new HandlerCategory(categoryData);

export const useHandleCategory = (
  clickedId: number,
  onCategoryChange: (action: () => void) => number | void
) => {
  const handleAdd = () => {
    onCategoryChange(() => {
      const id = Date.now();
      handlerCategory.add(
        {
          id,
          value: "",
          editable: true,
          subCategories: [],
          new: true,
        },
        clickedId
      );

      return id;
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
