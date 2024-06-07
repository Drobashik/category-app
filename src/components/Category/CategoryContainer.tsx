import { FunctionComponent, HTMLAttributes, useState } from "react";
import { Category } from ".";
import { categoryData } from "../../__mocks__/catrgoryData";
import classNames from "classnames";

type Props = HTMLAttributes<HTMLDivElement>;

export const CategoryContainer: FunctionComponent<Props> = ({
  className,
  ...props
}) => {
  const [category, setCategory] = useState(categoryData);

  const handleCategoryChange = (action: () => void) => {
    action();
    setCategory({ ...categoryData });
  };

  return (
    <div className={classNames("category_container", className)} {...props}>
      <Category category={category} onCategoryChange={handleCategoryChange} />
    </div>
  );
};
