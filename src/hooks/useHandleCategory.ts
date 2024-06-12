import { categoryData } from "../__mocks__/catrgoryData";
import { HandlerCategory } from "../lib/HandlerCategory";

const handlerCategory = new HandlerCategory(categoryData);

export const useHandleCategory = (
  { id, newValue }: { id: number; newValue: string },
  onCategoryChange: (action: () => void) => number | void
) => {
  const handleAdd = () => {
    onCategoryChange(() => {
      const newID = Date.now();

      handlerCategory.add(
        {
          id: newID,
          value: "",
          editable: true,
          subCategories: [],
          new: true,
        },
        id
      );

      return newID;
    });
  };

  const handleCancel = () => {
    onCategoryChange(() => {
      handlerCategory.cancel(id);
    });
  };

  const handleEdit = () => {
    onCategoryChange(() => {
      handlerCategory.edit(id);
    });
  };

  const handleConfirm = () => {
    onCategoryChange(() => {
      handlerCategory.confirm(newValue, id);
    });
  };

  const handleDelete = () => {
    onCategoryChange(() => {
      handlerCategory.delete(id);
    });
  };

  return {
    handleAdd,
    handleEdit,
    handleCancel,
    handleConfirm,
    handleDelete,
  };
};
