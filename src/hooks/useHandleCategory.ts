import { categoryData } from "../__mocks__/catrgoryData";
import { HandlerCategory } from "../lib/HandlerCategory";

const handlerCategory = new HandlerCategory(categoryData);

export const useHandleCategory = (
  { id, newValue }: { id: number; newValue: string },
  onCategoryChange: (action: () => number) => void
) => {
  const addCategory = () => {
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

  const cancelCategory = () => {
    onCategoryChange(() => {
      handlerCategory.cancel(id);

      return id;
    });
  };

  const editCategory = () => {
    onCategoryChange(() => {
      handlerCategory.edit(id);

      return id;
    });
  };

  const confirmCategory = () => {
    onCategoryChange(() => {
      handlerCategory.confirm(newValue, id);

      return id;
    });
  };

  const deleteCategory = () => {
    onCategoryChange(() => {
      handlerCategory.delete(id);

      return id;
    });
  };

  return {
    addCategory,
    editCategory,
    cancelCategory,
    confirmCategory,
    deleteCategory,
  };
};
