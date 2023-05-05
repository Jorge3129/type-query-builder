import { MethodDictionary } from "../expression-builder/create-expression-buider";
import { defaultOperators } from "../operators/default-operators";

export type QueryBuilderOptions = {
  operators?: MethodDictionary;
  escapeIdentifier: (name: string) => string;
  placeholderGenerator: (paramIndex: number) => string;
};

export const getDefaultQueryBuilderOptions = (
  options: QueryBuilderOptions
): Required<QueryBuilderOptions> => {
  return {
    operators: options.operators ?? defaultOperators,
    escapeIdentifier: options.escapeIdentifier,
    placeholderGenerator: options.placeholderGenerator,
  };
};
