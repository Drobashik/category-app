import { FunctionComponent, useState } from "react";
import { Category } from "../../types/Category.type";
import classNames from "classnames";
import { SVGArrowDown } from "../shared/SvgIcon/Icons";

type Props = {
  category: Category;
  className?: string;
};

export const CategoryList: FunctionComponent<Props> = ({
  className,
  category,
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenList = () => {
    if (!category.subCategories.length) return;

    setOpen((prev) => !prev);
  };

  return (
    <div className={className}>
      <div
        className={classNames("category-list_box", {
          "category-list_box--open": isOpen,
        })}
        onClick={handleOpenList}
      >
        <span>{category.value}</span>

        {/* TODO: Svg Icons needs to be rewritten to common svg component 
          and it should inherit all props of the element */}
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
              className={className}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
