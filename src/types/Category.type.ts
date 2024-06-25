export type Category = {
  value: string;
  id: number;
  subCategories: Category[];
  editable: boolean;
  new: boolean;
};
