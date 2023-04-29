import { Expression } from "../expression/expression";
import { LiteralExpression } from "../expression/literal-expression";
import {
  VariableExpression,
  isVariableExpression,
} from "../expression/variable-expression";
import { defaultOperators } from "../operators/operators";
import { ExprBuilder, isExprBuilder } from "./expression-builder";

export interface MethodDictionary {
  [key: PropertyKey]: (...args: any[]) => Expression;
}

export function createHandler(
  methods: MethodDictionary = {},
  currentExpr: Expression = new VariableExpression()
): ProxyHandler<object> {
  return {
    get: function (_: object, prop: PropertyKey) {
      if (prop === "build") {
        return () => currentExpr;
      }

      if (typeof methods[prop] === "function") {
        return function (...args: any[]) {
          const builtArgs: Expression[] = [
            currentExpr,
            ...args.map((arg) =>
              isExprBuilder(arg) ? arg.build() : new LiteralExpression(arg)
            ),
          ];

          const newExpr: Expression = methods[prop](...builtArgs);

          return new Proxy({}, createHandler(methods, newExpr));
        };
      }

      if (!isVariableExpression(currentExpr)) {
        throw Error(`Operator ${String(prop)} not defined`);
      }

      const newExpr = currentExpr.addPathItem(String(prop));

      return new Proxy({}, createHandler(methods, newExpr));
    },
  };
}

export const createExprBuilder = <T = unknown>(
  methods?: MethodDictionary,
  currentExpr?: Expression
): T => new Proxy({}, createHandler(methods, currentExpr)) as T;

export const litExp = <T>(val: T) =>
  createExprBuilder<ExprBuilder<T>>(
    defaultOperators,
    new LiteralExpression(val)
  );
