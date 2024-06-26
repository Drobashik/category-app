import { categoryData } from "../__mocks__/categoryData";
import { HandlerCategory } from "../lib/HandlerCategory";

const handlerCategory = new HandlerCategory(categoryData);

type HandledCategory = {
  id: number;
  newValue?: string;
};

export const useHandleCategory = (
  { id, newValue }: HandledCategory,
  onCategoryChange: (action: () => number) => void
) => {
  const addCategory = () => {
    onCategoryChange(() => {
      const newCategory = {
        id: parseInt(Date.now().toString().split("").reverse().join("")),
        value: "",
        editable: true,
        subCategories: [],
        new: true,
      };

      handlerCategory.add(newCategory, id);

      return newCategory.id;
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
      handlerCategory.confirm(
        newValue || `New_${Math.floor(Math.random() * 10000)}`,
        id
      );

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
