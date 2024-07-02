import { Category } from "../types/Category.type";

export class HandlerCategory {
  constructor(private category: Category) {}

  private processCategoryTree = (change: (node: Category) => boolean) => {
    const stack = [this.category];

    while (stack.length > 0) {
      const node = stack.pop() as Category;

      const isCyclingStopped = change(node);

      if (isCyclingStopped) {
        break;
      }

      if (node.subCategories.length) {
        stack.push(...node.subCategories);
      }
    }
  };

  add = (newCategory: Category, id: number) => {
    this.processCategoryTree((node) => {
      if (id === node.id) {
        node.subCategories.push(newCategory);
        return true;
      }

      return false;
    });

    return newCategory.id;
  };

  edit = (id: number) => {
    this.processCategoryTree((node) => {
      if (id === node.id) {
        node.editable = true;

        return true;
      }

      return false;
    });

    return id;
  };

  cancel = (id: number) => {
    this.processCategoryTree((node) => {
      if (id === node.id) {
        node.editable = false;

        return true;
      }

      return false;
    });

    return id;
  };

  confirm = (id: number, value: string) => {
    console.log(value);
    this.processCategoryTree((node) => {
      if (id === node.id) {
        node.value = value;
        node.editable = false;
        node.new = false;

        return true;
      }

      return false;
    });

    return id;
  };

  delete = (id: number) => {
    this.processCategoryTree((node) => {
      const index = node.subCategories.findIndex(
        (category) => category.id === id
      );

      if (index !== -1) {
        node.subCategories.splice(index, 1);

        return true;
      }

      return false;
    });

    return id;
  };

  find = (value: string) => {
    const filteredCategories: Category[] = [];

    this.processCategoryTree((node) => {
      if (node.value.toLowerCase().includes(value.toLowerCase().trim())) {
        filteredCategories.push(node);
      }

      return false;
    });

    return filteredCategories;
  };
}
