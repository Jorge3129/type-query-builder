import { Table } from "./table";

export type MergeContext<
  Context extends {},
  Alias extends string,
  Model
> = Context & {
  [key in Alias]: Table<Model>;
};
