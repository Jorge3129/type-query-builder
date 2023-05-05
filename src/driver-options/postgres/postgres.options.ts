import { defaultOperators } from "../../operators/default-operators";
import { QueryBuilderOptions } from "../../query-builder/query-builder-options";
import { escapeIdentifierUsingChar } from "../../utils/escape-identifier";

export const postgresOptions: QueryBuilderOptions = {
  operators: defaultOperators,
  escapeIdentifier: (name) => escapeIdentifierUsingChar(name, '"'),
  placeholderGenerator: (index) => `$${index + 1}`,
};
