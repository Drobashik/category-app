import { FunctionComponent, MouseEvent, useEffect, useState } from "react";
import { Category } from "../../types/Category.type";
import classNames from "classnames";
import { EyeSVG, SVGArrowDown } from "../shared/SvgIcon/Icons";
import { isMobile } from "../../helpers";

type Props = {
  category: Category;
  onFocus: (id: number) => void;
  onListClose: () => void;
  globalCollapseKey: number;
};

export const CategoryList: FunctionComponent<Props> = ({
  category,
  onFocus,
  globalCollapseKey,
  onListClose,
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenList = () => {
    if (!category.subCategories.length) return;

    setOpen((prev) => !prev);
  };

  const handleFocus = (event: MouseEvent) => {
    event.stopPropagation();

    if (isMobile()) {
      onListClose();
    }

    onFocus(category.id);
  };

  useEffect(() => {
    setOpen(false);
  }, [globalCollapseKey]);

  return (
    <div className="category-list">
      <div
        className={classNames("category-list_box", {
          "category-list_box--open": isOpen,
        })}
        onClick={handleOpenList}
      >
        {/* TODO: Svg Icons needs to be rewritten to common svg component 
          and it should inherit all props of the element */}
        <div>
          <div className="category-list_eye" onClick={handleFocus}>
            <EyeSVG />
          </div>
          <span>{category.value}</span>
        </div>
        {!!category.subCategories.length && <SVGArrowDown />}
      </div>
      {!!category.subCategories.length && (
        <ul
          className={classNames("category-list_sub", {
            "category-list_sub--open": isOpen,
          })}
        >
          {category.subCategories.map((subCategory) => (
            <CategoryList
              key={subCategory.id}
              category={subCategory}
              onFocus={onFocus}
              onListClose={onListClose}
              globalCollapseKey={globalCollapseKey}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
