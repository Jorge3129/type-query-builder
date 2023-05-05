import { defaultOperators } from "../../operators/default-operators";
import { QueryBuilderOptions } from "../../query-builder/query-builder-options";
import { escapeIdentifierUsingChar } from "../../utils/escape-identifier";
import { DialectOptions } from "../dialect-options";
import { PostgresDriver } from "./postgres-driver";

export const postgresDialectOptions: DialectOptions = {
  operators: defaultOperators,
  escapeIdentifier: (name) => escapeIdentifierUsingChar(name, '"'),
  generatePlaceholder: (index) => `$${index + 1}`,
};

export const postgresOptions: QueryBuilderOptions = {
  dialectOptions: postgresDialectOptions,
  driver: new PostgresDriver(),
};
