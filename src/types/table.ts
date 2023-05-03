import { Attribute } from "./attribute";

export type Table<T> = {
  [K in keyof T]: Attribute<T[K], K extends string ? K : string>;
};
