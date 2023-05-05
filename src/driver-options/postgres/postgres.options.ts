import { defaultOperators } from "../../operators/default-operators";
import { QueryBuilderOptions } from "../../query-builder/query-builder-options";

export const postgresOptions: QueryBuilderOptions = {
  identifierEscapeChararacter: '"',
  operators: defaultOperators,
  placeholderGenerator: (index) => `$${index + 1}`,
};
