import { escapeIdentifier } from "../utils/escape-identifier";
import { isExpressionQueryFragment } from "./query-fragment/expression-query-fragment";
import { isIdentifierQueryFragment } from "./query-fragment/identifier-query-fragment";
import {
  ExtendedQueryFragment,
  QueryFragment,
} from "./query-fragment/query-fragment";
import { textFragment } from "./query-fragment/text-query-fragment";
import { ToQueryFragmentsConfig } from "./query-fragment/to-query-fragments";

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
            .join(".")
        ),
      ];
    }

    if (isExpressionQueryFragment(fragment)) {
      return preprocessExtendedFragments(
        fragment.expression.toQueryFragments(),
        config
      );
    }

    return [fragment];
  });
};
