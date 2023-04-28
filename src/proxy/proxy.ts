// Define the target object
const user = {
  id: 1,
  name: "John Doe",
};

// Create a handler with a get trap
const handler = {
  get: function (target: object, prop: PropertyKey) {
    // Return the property name instead of the actual value
    return prop;
  },
};

// Create a proxy for the user object
const proxyUser = new Proxy(user, handler) as typeof user;

// Access properties through the proxy
console.log(proxyUser.id); // Output: 'id'
console.log(proxyUser.name); // Output: 'name'
