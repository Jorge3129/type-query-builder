import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { Expression } from "./expression";
import { sepBy } from "./sep-by";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

export const commaSep = (args: QueryFragment[][]): QueryFragment[] => {
  const argQueryBits = args.map((bits, index, { length }) => {
    return index === length - 1
      ? bits
      : [...bits.slice(0, -1), bits[bits.length - 1].setSpaceAfter(false)];
  });

  return sepBy(argQueryBits, textFragment(","));
};

export const commaSepExpressions = (
  args: Expression[],
  config: ToQueryFragmentsConfig
): QueryFragment[] => {
  return commaSep(args.map((a) => a.toQueryFragments(config)));
};
