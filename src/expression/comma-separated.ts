import { QueryBit, stringBit } from "../query-stringifier/query-param";
import { QueryStringifierConfig } from "../query-stringifier/query-stringifier";
import { Expression } from "./expression";
import { sepBy } from "./sep-by";

export const commaSep = (args: QueryBit[][]): QueryBit[] => {
  const argQueryBits = args.map((bits, index, { length }) => {
    return index === length - 1
      ? bits
      : [...bits.slice(0, -1), bits[bits.length - 1].modifySpace(false)];
  });

  return sepBy(argQueryBits, stringBit(","));
};

export const commaSepExpressions = (
  args: Expression[],
  config: QueryStringifierConfig
): QueryBit[] => {
  return commaSep(args.map((a) => a.toQueryBits(config)));
};
