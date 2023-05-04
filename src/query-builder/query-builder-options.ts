import { MethodDictionary } from "../expression-builder/create-expression-buider";
import { defaultOperators } from "../operators/default-operators";

export type QueryBuilderOptions = {
  operators?: MethodDictionary;
  identifierEscapeChararacter: string;
};

export const getDefaultQueryBuilderOptions = (
  options: QueryBuilderOptions
): Required<QueryBuilderOptions> => {
  return {
    operators: options.operators ?? defaultOperators,
    identifierEscapeChararacter: options?.identifierEscapeChararacter,
  };
};
