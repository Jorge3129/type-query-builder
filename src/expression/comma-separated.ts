import { QueryComponent } from "../query-stringifier/query-component/query-component";
import { QueryComponentSerializerConfig } from "../query-stringifier/query-component-serializer";
import { Expression } from "./expression";
import { sepBy } from "./sep-by";
import { textComponent } from "../query-stringifier/query-component/query-text-component";

export const commaSep = (args: QueryComponent[][]): QueryComponent[] => {
  const argQueryBits = args.map((bits, index, { length }) => {
    return index === length - 1
      ? bits
      : [...bits.slice(0, -1), bits[bits.length - 1].setSpaceAfter(false)];
  });

  return sepBy(argQueryBits, textComponent(","));
};

export const commaSepExpressions = (
  args: Expression[],
  config: QueryComponentSerializerConfig
): QueryComponent[] => {
  return commaSep(args.map((a) => a.toQueryComponents(config)));
};
