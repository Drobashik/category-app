export type CategoryType = {
  value: string;
  id: number;
  subCategories: CategoryType[];
  editable: boolean;
};
