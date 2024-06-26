import { categoryData } from "../__mocks__/categoryData";
import { MAX_POSSIBLE_ID } from "../constants";
import { getRandom, getRandomId } from "../helpers";
import { HandlerCategory } from "../lib/HandlerCategory";

const handlerCategory = new HandlerCategory(categoryData);

type HandledCategory = {
  id: number;
  newValue?: string;
};

export const useHandleCategory = (
  { id, newValue }: HandledCategory,
  onCategoryChange: (action: () => number) => void,
) => {
  const addCategory = () => {
    onCategoryChange(() => {
      const newCategory = {
        id: getRandomId(),
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
        newValue || `Node_${getRandom(MAX_POSSIBLE_ID)}`,
        id,
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
