export type Param<T = any> = {
  type: "param";
  value: T;
};

export type StringOrParam = string | Param;

export const param = <T>(value: T): Param<T> => ({ type: "param", value });
