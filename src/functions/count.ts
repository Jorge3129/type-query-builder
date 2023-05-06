import { createExprBuilder } from "../expression-builder/create-expression-buider";
import { NumExprBuilder } from "../expression-builder/data-types/numeric";
import {
  ExprBuilder,
  isExprBuilder,
} from "../expression-builder/expression-builder";
import { FunctionCallExpression } from "../expression/function-call-expression";
import { LiteralExpression } from "../expression/literal-expression";
import { defaultOperators } from "../operators/default-operators";

export const count = (arg: ExprBuilder<any>): NumExprBuilder => {
  return createExprBuilder(
    new FunctionCallExpression(
      "COUNT",
      isExprBuilder(arg) ? arg.build() : new LiteralExpression(arg)
    ),
    defaultOperators
  );
};
