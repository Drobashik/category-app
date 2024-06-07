import { FunctionComponent, memo, useState } from "react";
import { Category } from ".";
import { categoryData } from "../../__mocks__/catrgoryData";

export const CategoryContainer: FunctionComponent = memo(() => {
  const [category, setCategory] = useState(categoryData);

  const handleCategoryChange = (action: () => void) => {
    action();
    setCategory({ ...categoryData });
  };

  return (
    <Category category={category} onCategoryChange={handleCategoryChange} />
  );
});
