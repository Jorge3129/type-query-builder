import { defaultOperators } from "../../operators/default-operators";
import { QueryBuilderOptions } from "../../query-builder/query-builder-options";

export const mysqlOptions: QueryBuilderOptions = {
  identifierEscapeChararacter: "`",
  operators: defaultOperators,
  placeholderGenerator: () => "?",
};
