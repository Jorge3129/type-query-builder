import {
  Expression,
  VariableExpression,
  LiteralExpression,
} from "../expression/expression";
import { isExpr } from "./expression-builder";

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
              isExpr(arg) ? arg.build() : new LiteralExpression(arg)
            ),
          ];

          const newExpr: Expression = methods[prop](...builtArgs);

          return new Proxy({}, createHandler(methods, newExpr));
        };
      }

      if (currentExpr.type !== "attribute") {
        throw Error(`Operator ${String(prop)} not defined`);
      }

      const newExpr = currentExpr.addPathItem(String(prop));

      return new Proxy({}, createHandler(methods, newExpr));
    },
  };
}

export const createBuilder = <T = unknown>(methods?: MethodDictionary): T =>
  new Proxy({}, createHandler(methods)) as T;
