import { QueryComponent } from "../query-stringifier/query-component/query-component";

export const sepBy = (
  args: QueryComponent[][],
  separator: QueryComponent
): QueryComponent[] => {
  return args.flatMap((argBits, index, { length }) => {
    if (index === length - 1) {
      return argBits;
    }

    return [...argBits, separator];
  });
};
