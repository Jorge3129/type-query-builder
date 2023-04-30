import { QueryBit } from "../query-stringifier/query-param";

export const sepBy = (args: QueryBit[][], separator: QueryBit): QueryBit[] => {
  return args.flatMap((argBits, index, { length }) => {
    if (index === length - 1) {
      return argBits;
    }

    return [...argBits, separator];
  });
};
