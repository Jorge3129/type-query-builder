import { QueryBits } from "../query-stringifier/query-param";

export const sepBy = (args: QueryBits[], separator: string) => {
  return args.flatMap((argBits, index, { length }) => {
    if (index === length - 1) {
      return argBits;
    }

    return [...argBits, separator];
  });
};
