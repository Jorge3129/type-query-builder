import { QueryAndParams } from "./query";
import { QueryBits } from "./query-param";

interface QueryAccumulator {
  paramIndex: number;
  queryStrings: string[];
  params: any[];
}

export type PlaceholderGenerator = (paramIndex: number) => string;

export const stringifyQuery = (
  queryBits: QueryBits,
  placeholderGenerator: PlaceholderGenerator
): QueryAndParams => {
  const initAcc: QueryAccumulator = {
    paramIndex: 0,
    queryStrings: [],
    params: [],
  };

  const result = queryBits.reduce((acc, strOrParam) => {
    const { paramIndex, queryStrings, params } = acc;

    if (typeof strOrParam === "string") {
      return {
        paramIndex: paramIndex,
        queryStrings: [...queryStrings, strOrParam],
        params,
      };
    }

    return {
      paramIndex: paramIndex + 1,
      queryStrings: [...queryStrings, placeholderGenerator(paramIndex)],
      params: [...params, strOrParam.value],
    };
  }, initAcc);

  return {
    queryString: result.queryStrings.join(" "),
    params: result.params,
  };
};
