import { QueryAndParams } from "./query-and-params";
import { QueryFragment } from "./query-fragment/query-fragment";
import {
  TextQueryFragment,
  isTextQueryFragment,
  textFragment,
} from "./query-fragment/text-query-fragment";

interface QueryAccumulator {
  paramIndex: number;
  queryTextComponents: TextQueryFragment[];
  params: any[];
}

export type PlaceholderGenerator = (paramIndex: number) => string;

export const joinWithSpaceAfter = (
  fragments: QueryFragment[],
  separator: string
) => {
  return fragments.reduce((acc, fragment, index, { length }) => {
    const isLast = index === length - 1;
    const newSeparator = fragment.spaceAfter && !isLast ? separator : "";
    const newFragment = fragment.value + newSeparator;

    return acc + newFragment;
  }, "");
};

export const composeQueryFragments = (
  queryFragments: QueryFragment[],
  placeholderGenerator: PlaceholderGenerator
): QueryAndParams => {
  const initAcc: QueryAccumulator = {
    paramIndex: 0,
    queryTextComponents: [],
    params: [],
  };

  const result = queryFragments.reduce((acc, queryComponent) => {
    const { paramIndex, queryTextComponents, params } = acc;

    if (isTextQueryFragment(queryComponent)) {
      return {
        paramIndex: paramIndex,
        queryTextComponents: [...queryTextComponents, queryComponent],
        params,
      };
    }

    return {
      paramIndex: paramIndex + 1,
      queryTextComponents: [
        ...queryTextComponents,
        textFragment(
          placeholderGenerator(paramIndex),
          queryComponent.spaceAfter
        ),
      ],
      params: [...params, queryComponent.value],
    };
  }, initAcc);

  return {
    queryString: joinWithSpaceAfter(result.queryTextComponents, " "),
    params: result.params,
  };
};
