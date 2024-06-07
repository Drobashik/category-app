import { CategoryType } from "../types/Category.type";

export class HandlerCategory {
  constructor(private category: CategoryType) {}

  private traverseCategories = (
    changeCallback: (node: CategoryType) => boolean
  ) => {
    const stack = [this.category];

    while (stack.length > 0) {
      const node = stack.pop() as CategoryType;

      if (changeCallback(node)) {
        return;
      }

      if (node.subCategories.length) {
        stack.push(...node.subCategories);
      }
    }
  };

  add = (newCategory: CategoryType, id: number) => {
    this.traverseCategories((node) => {
      if (id === node.id) {
        node.subCategories.push(newCategory);
        return true;
      }

      return false;
    });
  };

  edit = (id: number) => {
    this.traverseCategories((node) => {
      if (id === node.id) {
        node.editable = true;
        return true;
      }

      return false;
    });
  };

  cancel = (id: number) => {
    this.traverseCategories((node) => {
      if (id === node.id) {
        node.editable = false;
        return true;
      }

      return false;
    });
  };

  confirm = (editedValue: string, id: number) => {
    this.traverseCategories((node) => {
      if (id === node.id) {
        node.value = editedValue;
        node.editable = false;
        return true;
      }

      return false;
    });
  };

  delete = (id: number) => {
    this.traverseCategories((node) => {
      const index = node.subCategories.findIndex(
        (category) => category.id === id
      );

      if (index !== -1) {
        node.subCategories.splice(index, 1);
        return true;
      }

      return false;
    });
  };
}
