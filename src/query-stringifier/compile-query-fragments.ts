import { QueryAndParams } from "./query-and-params";
import { QueryFragment } from "./query-fragment/query-fragment";
import {
  TextQueryFragment,
  isTextQueryFragment,
  textFragment,
} from "./query-fragment/text-query-fragment";

interface QueryAccumulator {
  paramIndex: number;
  textFragments: TextQueryFragment[];
  params: any[];
}

export type PlaceholderGenerator = (paramIndex: number) => string;

export const joinTextFragments = (
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

export const compileQueryFragments = (
  queryFragments: QueryFragment[],
  placeholderGenerator: PlaceholderGenerator
): QueryAndParams => {
  const initAcc: QueryAccumulator = {
    paramIndex: 0,
    textFragments: [],
    params: [],
  };

  const result = queryFragments.reduce((acc, fragment) => {
    const { paramIndex, textFragments, params } = acc;

    if (isTextQueryFragment(fragment)) {
      return {
        paramIndex: paramIndex,
        textFragments: [...textFragments, fragment],
        params,
      };
    }

    return {
      paramIndex: paramIndex + 1,
      textFragments: [
        ...textFragments,
        textFragment(placeholderGenerator(paramIndex), fragment.spaceAfter),
      ],
      params: [...params, fragment.value],
    };
  }, initAcc);

  return {
    queryString: joinTextFragments(result.textFragments, " "),
    params: result.params,
  };
};
