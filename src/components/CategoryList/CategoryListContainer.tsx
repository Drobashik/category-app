import { FunctionComponent, memo, useMemo, useState } from "react";
import { Category } from "../../types/Category.type";
import { CategoryList } from "./index";
import { CollapseSVG } from "../shared/SvgIcon/Icons";
import { InputText } from "../shared/InputText";
import { useInputText } from "../../hooks/useInputText";

type Props = {
  category: Category;
  findCategory: (value: string) => Category[];
  onFocus: (id: number) => void;
  onListClose: () => void;
};

export const CategoryListContainer: FunctionComponent<Props> = memo(
  ({ category, findCategory, ...restProps }) => {
    const [globalCollapseKey, setGlobalCollapseKey] = useState(0);

    const { inputValue, changeInputValue } = useInputText();

    const handleGlobalCollapse = () => {
      setGlobalCollapseKey((prev) => prev + 1);
    };

    const categories = useMemo(
      () => (inputValue ? findCategory(inputValue) : [category]),
      [inputValue]
    );

    return (
      <div>
        <div className="category-list_control">
          <InputText
            className="category-list_input"
            value={inputValue}
            onChange={changeInputValue}
            placeholder="Find category"
          />
          <CollapseSVG onClick={handleGlobalCollapse} />
        </div>
        {categories.map((category) => (
          <CategoryList
            key={category.id}
            {...restProps}
            category={category}
            globalCollapseKey={globalCollapseKey}
          />
        ))}
      </div>
    );
  }
);
