export interface MethodDictionary {
  [key: PropertyKey]: (...args: any[]) => any;
}

export function createHandler(
  path: Array<{ type: string; name: string; args?: any[] }> = [],
  methods: MethodDictionary = {}
): ProxyHandler<object> {
  return {
    get: function (_: object, prop: PropertyKey) {
      if (prop === "build") {
        return () => path;
      }

      if (typeof methods[prop] === "function") {
        return function (...args: any[]) {
          const newPath = [
            ...path,
            { type: "method", name: String(prop), args },
          ];
          // console.log(`Calling method: ${String(prop)}`);
          return new Proxy({}, createHandler(newPath, methods));
        };
      }

      const newPath = [...path, { type: "prop", name: String(prop) }];
      return new Proxy({}, createHandler(newPath, methods));
    },
  };
}

export const createBuilder = <T = unknown>(methods?: MethodDictionary): T =>
  new Proxy({}, createHandler([], methods)) as T;
