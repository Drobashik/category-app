import { FunctionComponent, useState } from "react";
import { Category } from "../../types/Category.type";
import { CategoryList } from "./index";
import { CollapseSVG } from "../shared/SvgIcon/Icons";

type Props = {
  category: Category;
  onFocus: (id: number) => void;
  onListClose: () => void;
};

export const CategoryListContainer: FunctionComponent<Props> = ({
  category,
  onFocus,
  onListClose,
}) => {
  const [globalCollapseKey, setGlobalCollapseKey] = useState(0);

  const handleGlobalCollapse = () => {
    setGlobalCollapseKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="category-list_collapse" onClick={handleGlobalCollapse}>
        <CollapseSVG />
      </div>
      <CategoryList
        category={category}
        onFocus={onFocus}
        onListClose={onListClose}
        globalCollapseKey={globalCollapseKey}
      />
    </div>
  );
};
