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

export const stringifyJoin = (bits: QueryFragment[], separator: string) => {
  return bits.reduce((acc, bit, index, { length }) => {
    const isLast = index === length - 1;

    const newSeparator = bit.spaceAfter && !isLast ? separator : "";

    const newBit = bit.value + newSeparator;

    return acc + newBit;
  }, "");
};

export const stringifyQuery = (
  queryBits: QueryFragment[],
  placeholderGenerator: PlaceholderGenerator
): QueryAndParams => {
  const initAcc: QueryAccumulator = {
    paramIndex: 0,
    queryTextComponents: [],
    params: [],
  };

  const result = queryBits.reduce((acc, queryComponent) => {
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
    queryString: stringifyJoin(result.queryTextComponents, " "),
    params: result.params,
  };
};
