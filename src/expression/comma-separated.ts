import {
  ExtendedQueryFragment,
  QueryFragment,
} from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { Expression } from "./expression";
import { sepBy } from "./sep-by";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";

export const commaSep = (args: QueryFragment[][]): QueryFragment[] => {
  const argQueryFragments = args.map((fragments, index, { length }) => {
    return index === length - 1
      ? fragments
      : [
          ...fragments.slice(0, -1),
          fragments[fragments.length - 1].setSpaceAfter(false),
        ];
  });

  return sepBy(argQueryFragments, textFragment(","));
};

export const setLastFragmentSpaceAfter = (
  fragments: QueryFragment[],
  spaceAfter: boolean
): QueryFragment[] => [
  ...fragments.slice(0, -1),
  fragments[fragments.length - 1].setSpaceAfter(spaceAfter),
];

export const commaSepExpressions = (
  expressions: Expression[]
): ExtendedQueryFragment[] => {
  return expressions.flatMap((expression, index, { length }) => {
    if (index === length - 1) {
      return expressionFragment(expression);
    }

    return [expressionFragment(expression), textFragment(",")];
  });
};
