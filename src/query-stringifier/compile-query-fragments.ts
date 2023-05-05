import { joinTextFragments } from "./utils/join-text-fragments";
import { preprocessExtendedFragments } from "./preprocess-extended-fragments";
import { QueryAndParams } from "./query-and-params";
import { ExtendedQueryFragment } from "./query-fragment/query-fragment";
import {
  TextQueryFragment,
  isTextQueryFragment,
  textFragment,
} from "./query-fragment/text-query-fragment";
import { QueryBuilderOptions } from "../query-builder/query-builder-options";

interface QueryAccumulator {
  paramIndex: number;
  textFragments: TextQueryFragment[];
  params: any[];
}

export const compileQueryFragments = (
  queryFragments: ExtendedQueryFragment[],
  config: QueryBuilderOptions
): QueryAndParams => {
  const preprocessedFragments = preprocessExtendedFragments(
    queryFragments,
    config
  );

  const initAcc: QueryAccumulator = {
    paramIndex: 0,
    textFragments: [],
    params: [],
  };

  const result = preprocessedFragments.reduce((acc, fragment) => {
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
        textFragment(
          config.placeholderGenerator(paramIndex),
          fragment.spaceAfter
        ),
      ],
      params: [...params, fragment.value],
    };
  }, initAcc);

  return {
    query: joinTextFragments(result.textFragments, " "),
    params: result.params,
  };
};
