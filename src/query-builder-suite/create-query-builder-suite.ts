import { createLiteralExpressionBuilder } from "../expression-builder/utils/lit-exp";
import { QueryBuilderOptions } from "../query-builder/query-builder-options";
import { SelectQueryBuilder } from "../query-builder/select-query-builder";
import { QueryBuilderSuite } from "./query-builder-suite";

export const createQueryBuilderSuite = async (
  options: QueryBuilderOptions,
  connectionConfig?: object
): Promise<QueryBuilderSuite> => {
  if (connectionConfig) {
    await options.driver.connect(connectionConfig).catch(() => {});
  }

  return {
    selectQueryBuilder: () => new SelectQueryBuilder(options),
    $litExp: createLiteralExpressionBuilder(options.dialectOptions.operators),
    disconnect: () => options.driver.disconnect(),
  };
};
