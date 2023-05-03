import { Expression } from "../expression/expression";
import { LiteralExpression } from "../expression/literal-expression";
import { isVariableExpression } from "../expression/variable-expression";
import { isExprBuilder } from "./expression-builder";

export interface MethodDictionary {
  [key: PropertyKey]: (...args: any[]) => Expression;
}

export function createHandler(
  currentExpr: Expression,
  methods: MethodDictionary = {}
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

          return new Proxy({}, createHandler(newExpr, methods));
        };
      }

      if (!isVariableExpression(currentExpr)) {
        throw Error(`Operator ${String(prop)} not defined`);
      }

      const newExpr = currentExpr.addPathItem(String(prop));

      return new Proxy({}, createHandler(newExpr, methods));
    },
  };
}

export const createExprBuilder = <T = unknown>(
  currentExpr: Expression,
  methods?: MethodDictionary
): T => new Proxy({}, createHandler(currentExpr, methods)) as T;
