import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";

export const sepBy = (
  args: QueryFragment[][],
  separator: QueryFragment
): QueryFragment[] => {
  return args.flatMap((argFragments, index, { length }) => {
    if (index === length - 1) {
      return argFragments;
    }

    return [...argFragments, separator];
  });
};
