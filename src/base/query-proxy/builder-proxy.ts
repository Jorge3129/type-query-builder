import { isExpr } from "../types/expr";
import { PathItem } from "./path-item";

export interface MethodDictionary {
  [key: PropertyKey]: (...args: any[]) => any;
}

export function createHandler(
  methods: MethodDictionary = {},
  path: PathItem = { type: "varpath", path: [] }
): ProxyHandler<object> {
  return {
    get: function (_: object, prop: PropertyKey) {
      if (prop === "build") {
        return () => path;
      }

      if (typeof methods[prop] === "function") {
        return function (...args: any[]) {
          const newPath: PathItem = {
            type: "operator",
            name: String(prop),
            args: [
              path,
              ...args.map((arg) => (isExpr(arg) ? arg.build() : arg)),
            ],
          };

          return new Proxy({}, createHandler(methods, newPath));
        };
      }

      if (path.type === "operator") {
        throw Error(`Operator ${String(prop)} not defined`);
      }

      const newPath = {
        ...path,
        path: [...path.path, String(prop)],
      };

      return new Proxy({}, createHandler(methods, newPath));
    },
  };
}

export const createBuilder = <T = unknown>(methods?: MethodDictionary): T =>
  new Proxy({}, createHandler(methods)) as T;
