import { ChangeEvent, FunctionComponent, memo, useMemo, useState } from "react";

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
import { Category } from "../../types/Category.type";
import { useHandleCategory } from "../../hooks/useHandleCategory";

type Props = {
  category: Category;
  onCategoryChange: (action: () => number) => void;
  isInner?: boolean;
  boxColor?: string;
  categoryIndex?: number;
  innerCategories?: Category[];
  onOpenDialog: (idToDelete: number) => void;
};

export const CategoryNode: FunctionComponent<Props> = memo(
  ({
    category: { value, subCategories, id, editable, new: isNew },
    onCategoryChange,
    isInner = false,
    boxColor = WHITE_COLOR,
    categoryIndex = 0,
    innerCategories = [],
    onOpenDialog,
  }) => {
    const [newValue, setNewValue] = useState(value);

    const {
      addCategory,
      cancelCategory,
      confirmCategory,
      editCategory,
      deleteCategory,
    } = useHandleCategory({ id, newValue }, onCategoryChange);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNewValue(event.target.value);
    };

    const handleCancel = () => {
      cancelCategory();
      setNewValue(value);
    };

    const generatedColor = useMemo(() => getReadableLightColor(), []);

    return (
      <div className="category-node">
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
        <div className="category-node_wrapper">
          <div
            className="category-node_box"
            id={`el-${id.toString()}`}
            style={{ background: editable ? "white" : boxColor }}
          >
            {editable ? (
              <InputText value={newValue} onChange={handleInputChange} />
            ) : (
              <span
                className="category-node_value"
                onPointerDown={(event) => event.stopPropagation()}
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
                onClick={confirmCategory}
              >
                <ConfirmSVG />
              </Button>
              <Button
                buttonType="icon"
                variant="error"
                onClick={isNew ? deleteCategory : handleCancel}
              >
                <CrossSVG />
              </Button>
            </>
          ) : (
            <>
              <Button buttonType="icon" variant="greyed" onClick={addCategory}>
                <PlusSVG />
              </Button>
              <Button buttonType="icon" variant="info" onClick={editCategory}>
                <EditSVG />
              </Button>
              {isInner && (
                <Button
                  buttonType="icon"
                  variant="error"
                  onClick={
                    subCategories.length
                      ? () => onOpenDialog(id)
                      : deleteCategory
                  }
                >
                  <CrossSVG />
                </Button>
              )}
            </>
          )}

          {!!subCategories.length && <Line position="bottom" />}
        </div>

        {!!subCategories.length && (
          <div className="category-node_sub">
            <Line position="central" />

            {subCategories.map((subCategory, index) => (
              <CategoryNode
                key={subCategory.id}
                category={subCategory}
                onCategoryChange={onCategoryChange}
                isInner
                categoryIndex={index}
                boxColor={generatedColor}
                innerCategories={subCategories}
                onOpenDialog={onOpenDialog}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
