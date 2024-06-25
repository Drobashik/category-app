import { Category } from "../types/Category.type";

export class HandlerCategory {
  constructor(private category: Category) {}

  private traverseCategories = (change: (node: Category) => boolean) => {
    const stack = [this.category];

    while (stack.length > 0) {
      const node = stack.pop() as Category;

      const success = change(node);

      if (success) {
        break;
      }

      if (node.subCategories.length) {
        stack.push(...node.subCategories);
      }
    }
  };

  add = (newCategory: Category, id: number) => {
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

  confirm = (newValue: string, id: number) => {
    this.traverseCategories((node) => {
      if (id === node.id) {
        node.value = newValue;
        node.editable = false;
        node.new = false;

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
