import { CategoryType } from "../types/Category.type";

export class HandlerCategory {
  constructor(private category: CategoryType) {}

  private changeCategory = (
    id: number,
    changeCallback: (node: CategoryType) => void
  ) => {
    const stack = [this.category];

    while (stack.length > 0) {
      const node = stack.pop()!;

      if (id === node.id) {
        changeCallback(node);
        return;
      }

      if (node.subCategories.length) {
        stack.push(...node.subCategories);
      }
    }
  };

  private deleteCategory = (id: number) => {
    const stack = [this.category];

    while (stack.length > 0) {
      const node = stack.pop()!;

      const index = node.subCategories.findIndex(
        (category) => category.id === id
      );

      if (index !== -1) {
        node.subCategories.splice(index, 1);
        return;
      }

      if (node.subCategories.length) {
        stack.push(...node.subCategories);
      }
    }
  };

  add = (newCategory: CategoryType, id: number) => {
    this.changeCategory(id, (node) => node.subCategories.push(newCategory));
  };

  edit = (id: number) => {
    this.changeCategory(id, (node) => {
      node.editable = true;
    });
  };

  confirm = (editedCategory: CategoryType, id: number) => {
    this.changeCategory(id, (node) => {
      node.value = editedCategory.value;
      node.editable = false;
    });
  };

  delete = (id: number) => {
    this.deleteCategory(id);
  };
}
