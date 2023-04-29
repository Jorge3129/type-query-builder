export type QueryParam<T = any> = {
  type: "param";
  value: T;
};

export type QueryStringOrParam = string | QueryParam;

export type QueryBits = QueryStringOrParam[];

export const param = <T>(value: T): QueryParam<T> => ({ type: "param", value });
