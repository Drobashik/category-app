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
import { Category } from "../../types/Category.type";
import { useInputText } from "../../hooks/useInputText";

type Props = {
  category: Category;
  isInner?: boolean;
  boxColor?: string;
  categoryIndex?: number;
  innerCategories?: Category[];
  onOpenDialog: (idToDelete: number) => void;
  add: (id: number) => void;
  edit: (id: number) => void;
  remove: (id: number) => void;
  confirm: (id: number, newValue?: string) => void;
  cancel: (id: number) => void;
};

export const CategoryNode: FunctionComponent<Props> = memo(
  ({
    category: { value, subCategories, id, editable, new: isNew },
    isInner = false,
    boxColor = WHITE_COLOR,
    categoryIndex = 0,
    innerCategories = [],
    onOpenDialog,
    ...restProps
  }) => {
    const { add, edit, remove, cancel, confirm } = restProps;

    const { inputValue, changeInputValue } = useInputText(value);

    const handleAdd = () => {
      add(id);
    };

    const handleEdit = () => {
      edit(id);
    };

    const handleDelete = () => {
      remove(id);
    };

    const handleConfirm = () => {
      confirm(id, inputValue || undefined);
    };

    const handleCancel = () => {
      cancel(id);
      changeInputValue(value);
    };

    const handleOpenDialog = () => {
      onOpenDialog(id);
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
              <InputText value={inputValue} onChange={changeInputValue} />
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
                onClick={handleConfirm}
              >
                <ConfirmSVG />
              </Button>
              <Button
                buttonType="icon"
                variant="error"
                onClick={isNew ? handleDelete : handleCancel}
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
                  onClick={
                    subCategories.length ? handleOpenDialog : handleDelete
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
                isInner
                category={subCategory}
                categoryIndex={index}
                boxColor={generatedColor}
                innerCategories={subCategories}
                onOpenDialog={onOpenDialog}
                {...restProps}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
