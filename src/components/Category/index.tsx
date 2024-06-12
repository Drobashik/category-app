import { FunctionComponent, memo, useMemo } from "react";
import { Line } from "../Line";

import {
  ConfirmSVG,
  CrossSVG,
  EditSVG,
  PlusSVG,
} from "../shared/SvgIcon/Icons";
import { Button } from "../shared/Button";
import { InputText } from "../shared/InputText";

import { WHITE_COLOR } from "../../constants";

import { getReadableLightColor } from "../../helpers";
import { CategoryType } from "../../types/Category.type";
import { useHandleCategory } from "../../hooks/useHandleCategory";
import { useInputText } from "../../hooks/useInputText";

type Props = {
  category: CategoryType;
  onCategoryChange: (action: () => void) => number | void;
  isInner?: boolean;
  boxColor?: string;
  categoryIndex?: number;
  innerCategories?: CategoryType[];
};

export const Category: FunctionComponent<Props> = memo(
  ({
    category: { value, subCategories, id, editable, new: isNew },
    onCategoryChange,
    isInner = false,
    boxColor = WHITE_COLOR,
    categoryIndex = 0,
    innerCategories = [],
  }) => {
    const { editedValue, handleInputChange } = useInputText(value);

    const generatedColor = useMemo(() => {
      return getReadableLightColor();
    }, []);

    const { handleAdd, handleCancel, handleConfirm, handleEdit, handleRemove } =
      useHandleCategory(id, onCategoryChange);

    const handleNewValue = () => {
      handleConfirm(editedValue);
    };

    const handleResetCancel = () => {
      handleCancel();
      handleInputChange(value);
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
            id={`el-${id.toString()}`}
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
            <>
              <Button
                buttonType="icon"
                variant="success"
                onClick={handleNewValue}
              >
                <ConfirmSVG />
              </Button>
              <Button
                buttonType="icon"
                variant="error"
                onClick={isNew ? handleRemove : handleResetCancel}
              >
                <CrossSVG />
              </Button>
            </>
          ) : (
            <>
              <Button buttonType="icon" variant="greyed" onClick={handleAdd}>
                <PlusSVG />
              </Button>
              <Button buttonType="icon" variant="info" onClick={handleEdit}>
                <EditSVG />
              </Button>
              {isInner && (
                <Button
                  buttonType="icon"
                  variant="error"
                  onClick={handleRemove}
                >
                  <CrossSVG />
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
  }
);
