import { createLiteralExpressionBuilder } from "../expression-builder/utils/lit-exp";
import { defaultOperators } from "../operators/default-operators";
import { QueryBuilderOptions } from "../query-builder/query-builder-options";
import { SelectQueryBuilder } from "../query-builder/select-query-builder";
import { QueryBuilderSuite } from "./query-builder-suite";

export const createQueryBuilderSuite = (
  options: QueryBuilderOptions
): QueryBuilderSuite => {
  return {
    selectQueryBuilder: () => new SelectQueryBuilder(options),
    $litExp: createLiteralExpressionBuilder(
      options.operators ?? defaultOperators
    ),
  };
};
