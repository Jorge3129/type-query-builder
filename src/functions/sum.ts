import { createExprBuilder } from "../expression-builder/create-expression-buider";
import { NumExprBuilder } from "../expression-builder/data-types/numeric";
import {
  ExprBuilder,
  isExprBuilder,
} from "../expression-builder/expression-builder";
import { FunctionCallExpression } from "../expression/function-call-expression";
import { LiteralExpression } from "../expression/literal-expression";
import { defaultOperators } from "../operators/default-operators";

export const sum = (arg: number | ExprBuilder<number>): NumExprBuilder => {
  return createExprBuilder(
    defaultOperators,
    new FunctionCallExpression(
      "SUM",
      isExprBuilder(arg) ? arg.build() : new LiteralExpression(arg)
    )
  );
};
