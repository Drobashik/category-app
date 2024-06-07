import { FunctionComponent, useMemo } from "react";
import { Line } from "../Line";

import { Button } from "../shared/Button";
import { InputText } from "../shared/InputText";

import { LIGHT_GREY_COLOR } from "../../constants";

import { getRandomColor } from "../../helpers";
import { CategoryType } from "../../types/Category.type";
import { useHandleCategory } from "../../hooks/useHandleCategory";
import { useInputText } from "../../hooks/useInputText";

type Props = {
  category: CategoryType;
  onCategoryChange: (action: () => void) => void;
  isInner?: boolean;
  innerCategories?: CategoryType[];
  categoryIndex?: number;
  boxColor?: string;
};

export const Category: FunctionComponent<Props> = ({
  category: { value, subCategories, id, editable },
  onCategoryChange,
  isInner = false,
  innerCategories = [],
  categoryIndex = 0,
  boxColor = LIGHT_GREY_COLOR,
}) => {
  const { editedValue, handleInputChange } = useInputText(value);

  const generatedColor = useMemo(() => {
    return getRandomColor();
  }, []);

  const { handleAdd, handleConfirm, handleEdit, handleRemove } =
    useHandleCategory(id, onCategoryChange);

  const handleEditingConfirm = () => {
    handleConfirm(editedValue);
  };

  return (
    <div className="category">
      {isInner && (
        <>
          {categoryIndex === 0 && (
            <Line
              position="central"
              type="transparent"
              transparentPosition="left"
            />
          )}

          <Line position="top" />

          {categoryIndex === innerCategories.length - 1 && (
            <Line
              position="central"
              type="transparent"
              transparentPosition="right"
            />
          )}
        </>
      )}
      <div className="category_wrapper">
        <div
          className="category_box"
          style={{ background: editable ? "white" : boxColor }}
        >
          {editable ? (
            <InputText value={editedValue} onChange={handleInputChange} />
          ) : (
            <span
              className="category_value"
              onMouseDown={(event) => event.stopPropagation()}
            >
              {value}
            </span>
          )}
        </div>

        {editable ? (
          <Button
            buttonType="icon"
            variant="success"
            onClick={handleEditingConfirm}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1/1687.png"
              alt="Confirm"
            />
          </Button>
        ) : (
          <>
            <Button buttonType="icon" variant="greyed" onClick={handleAdd}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/32/32563.png"
                alt="Plus"
              />
            </Button>
            <Button buttonType="icon" variant="info" onClick={handleEdit}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
                alt="Edit"
              />
            </Button>
            {isInner && (
              <Button buttonType="icon" variant="error" onClick={handleRemove}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/63/63694.png"
                  alt="Remove"
                />
              </Button>
            )}
          </>
        )}

        {!!subCategories.length && <Line position="bottom" />}
      </div>

      {!!subCategories.length && (
        <div className="category_sub">
          <Line position="central" />

          {subCategories.map((subCategory, index) => (
            <Category
              isInner
              key={subCategory.id}
              category={subCategory}
              onCategoryChange={onCategoryChange}
              categoryIndex={index}
              boxColor={generatedColor}
              innerCategories={subCategories}
            />
          ))}
        </div>
      )}
    </div>
  );
};
