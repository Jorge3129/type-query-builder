const user = {
  id: 1,
  name: "John Doe",
  address: {
    city: {
      id: 10,
      name: "New York",
    },
  },
};

export function createPathProxy(
  target: Record<PropertyKey, any>,
  path: PropertyKey[] = []
): object {
  return new Proxy(target, {
    get: function (target: Record<PropertyKey, any>, prop: PropertyKey) {
      if (typeof target[prop] === "object" && target[prop] !== null) {
        return createPathProxy(target[prop], [...path, prop]);
      }

      return [...path, prop];
    },
  });
}

const proxyUser = createPathProxy(user) as typeof user;

console.log(proxyUser.id); // Output: [ 'id' ]
console.log(proxyUser.name); // Output: [ 'name' ]
console.log(proxyUser.address.city.id); // Output: [ 'address', 'city', 'id' ]
