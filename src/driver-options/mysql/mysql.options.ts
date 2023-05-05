import { defaultOperators } from "../../operators/default-operators";
import { QueryBuilderOptions } from "../../query-builder/query-builder-options";
import { escapeIdentifierUsingChar } from "../../utils/escape-identifier";
import { DialectOptions } from "../dialect-options";
import { MysqlDriver } from "./mysql-driver";

export const mysqlDialectOptions: DialectOptions = {
  operators: defaultOperators,
  escapeIdentifier: (name) => escapeIdentifierUsingChar(name, "`"),
  generatePlaceholder: () => "?",
};

export const mysqlOptions: QueryBuilderOptions = {
  dialectOptions: mysqlDialectOptions,
  driver: new MysqlDriver(),
};
