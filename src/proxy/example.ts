import { MethodDictionary, createBuilder } from "./builder-proxy";

const methods = {
  like() {
    console.log("Like called");
  },
  dislike() {
    console.log("Dislike called");
  },
};

type MyType = {
  address: {
    like(a: string): {
      build(): Array<{ type: string; name: string }>;
    };
  };
};

const result = createBuilder<MyType>(methods).address.like("1").build();

console.log(result);
