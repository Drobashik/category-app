import { useCallback, useState } from "react";
import { categoryData } from "../__mocks__/categoryData";
import { MAX_POSSIBLE_ID } from "../constants";
import { getNewCategory, getRandom } from "../helpers";
import { HandlerCategory } from "../lib/HandlerCategory";

const handlerCategory = new HandlerCategory(categoryData);

export const useCategory = (changeFocus?: (id: number) => void) => {
  const [category, setCategory] = useState(categoryData);

  const changeCategory = useCallback((action: () => number) => {
    const id = action();

    changeFocus?.(id);

    setCategory({ ...categoryData });
  }, []);

  const find = useCallback((value: string) => handlerCategory.find(value), []);

  const add = useCallback(
    (id: number) => {
      changeCategory(() => handlerCategory.add(getNewCategory(), id));
    },
    [category]
  );

  const cancel = useCallback(
    (id: number) => changeCategory(() => handlerCategory.cancel(id)),
    [category]
  );

  const edit = useCallback(
    (id: number) => changeCategory(() => handlerCategory.edit(id)),
    [category]
  );

  const confirm = useCallback(
    (id: number, value = `Node_${getRandom(MAX_POSSIBLE_ID)}`) =>
      changeCategory(() => handlerCategory.confirm(id, value)),
    [category]
  );

  const remove = useCallback(
    (id: number) => changeCategory(() => handlerCategory.delete(id)),
    [category]
  );

  return {
    category,
    add,
    edit,
    cancel,
    confirm,
    remove,
    find,
  };
};
