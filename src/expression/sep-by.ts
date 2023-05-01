import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";

export const sepBy = (
  args: QueryFragment[][],
  separator: QueryFragment
): QueryFragment[] => {
  return args.flatMap((argBits, index, { length }) => {
    if (index === length - 1) {
      return argBits;
    }

    return [...argBits, separator];
  });
};
