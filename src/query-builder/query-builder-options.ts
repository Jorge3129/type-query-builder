import { MethodDictionary } from "../expression-builder/create-expression-buider";
import { defaultOperators } from "../operators/default-operators";

export type QueryBuilderOptions = {
  operators: MethodDictionary;
  escapeChar: string;
};

export const getDefaultQueryBuilderOptions = (
  options?: Partial<QueryBuilderOptions>
): QueryBuilderOptions => {
  return {
    operators: options?.operators ?? defaultOperators,
    escapeChar: options?.escapeChar ?? '"',
  };
};
