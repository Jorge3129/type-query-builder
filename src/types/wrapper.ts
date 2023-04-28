export type Table<T> = { [K in keyof T]: Attr<T[K]> } & {
  "@@name": string;
};

export type Attr<T> = {
  "@@name": string;
};
