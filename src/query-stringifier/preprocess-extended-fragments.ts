import { escapeIdentifier } from "../utils/escape-identifier";
import { isExpressionQueryFragment } from "./query-fragment/expression-query-fragment";
import { isIdentifierQueryFragment } from "./query-fragment/identifier-query-fragment";
import {
  ExtendedQueryFragment,
  QueryFragment,
} from "./query-fragment/query-fragment";
import { textFragment } from "./query-fragment/text-query-fragment";
import { ToQueryFragmentsConfig } from "./query-fragment/to-query-fragments";
import { setLastFragmentSpaceAfter } from "./utils/set-last-fragment-space-after";

export const preprocessExtendedFragments = (
  fragments: ExtendedQueryFragment[],
  config: ToQueryFragmentsConfig
): QueryFragment[] => {
  return fragments.flatMap((fragment) => {
    if (isIdentifierQueryFragment(fragment)) {
      return [
        textFragment(
          fragment.path
            .map((id) =>
              escapeIdentifier(id, config.identifierEscapeChararacter)
            )
            .join("."),
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
