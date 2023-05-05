import { QueryBuilderOptions } from "../query-builder/query-builder-options";
import { isExpressionQueryFragment } from "./query-fragment/expression-query-fragment";
import { isIdentifierQueryFragment } from "./query-fragment/identifier-query-fragment";
import {
  ExtendedQueryFragment,
  QueryFragment,
} from "./query-fragment/query-fragment";
import { textFragment } from "./query-fragment/text-query-fragment";
import { setLastFragmentSpaceAfter } from "./utils/set-last-fragment-space-after";

export const preprocessExtendedFragments = (
  fragments: ExtendedQueryFragment[],
  config: QueryBuilderOptions
): QueryFragment[] => {
  return fragments.flatMap((fragment) => {
    if (isIdentifierQueryFragment(fragment)) {
      return [
        textFragment(
          config.escapeIdentifier(fragment.name),
          fragment.spaceAfter
        ),
      ];
    }

    if (isExpressionQueryFragment(fragment)) {
      return preprocessExtendedFragments(
        setLastFragmentSpaceAfter(
          fragment.expression.toQueryFragments(),
          fragment.spaceAfter
        ),
        config
      );
    }

    return [fragment];
  });
};
