interface MethodDictionary {
  [key: PropertyKey]: (...args: any[]) => any;
}

export function createHandler(
  path: Array<{ type: string; name: string; args?: any[] }> = [],
  methods: MethodDictionary = {}
): ProxyHandler<object> {
  return {
    get: function (target: object, prop: PropertyKey) {
      if (prop === "build") {
        return () => path;
      }

      const newPath = [
        ...path,
        {
          type: typeof methods[prop] === "function" ? "method" : "prop",
          name: String(prop),
        },
      ];

      if (typeof methods[prop] === "function") {
        return function (...args: any[]) {
          console.log(`Calling method: ${String(prop)}`);
          newPath[newPath.length - 1].args = args;
          return new Proxy({}, createHandler(newPath, methods));
        };
      }

      return new Proxy({}, createHandler(newPath, methods));
    },
  };
}

const methods: MethodDictionary = {
  like() {
    console.log("Like called");
  },
  dislike() {
    console.log("Dislike called");
  },
};

// Create a proxy for an empty object with the methods dictionary
const proxy: any = new Proxy({}, createHandler([], methods));

// Access properties and methods through the proxy
const result = proxy.address.like(1, 2).city.dislike(3, 4).build();
console.log(result);
// Output: [ { type: 'prop', name: 'address' }, { type: 'method', name: 'like', args: [ 1, 2 ] }, { type: 'prop', name: 'city' }, { type: 'method', name: 'dislike', args: [ 3, 4 ] } ]
