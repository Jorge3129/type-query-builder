import { defaultOperators } from "../../operators/default-operators";
import { QueryBuilderOptions } from "../../query-builder/query-builder-options";
import { escapeIdentifierUsingChar } from "../../utils/escape-identifier";

export const mysqlOptions: QueryBuilderOptions = {
  operators: defaultOperators,
  escapeIdentifier: (name) => escapeIdentifierUsingChar(name, "`"),
  placeholderGenerator: () => "?",
};
