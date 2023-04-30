import { QueryAndParams } from "./query";
import { QueryBit, QueryStringBit, stringBit } from "./query-param";

interface QueryAccumulator {
  paramIndex: number;
  stringBits: QueryStringBit[];
  params: any[];
}

export type PlaceholderGenerator = (paramIndex: number) => string;

export const stringifyJoin = (bits: QueryBit[], separator: string) => {
  return bits.reduce((acc, bit, index, { length }) => {
    const isLast = index === length - 1;

    const newSeparator = bit.spaceAfter && !isLast ? separator : "";

    const newBit = bit.value + newSeparator;

    return acc + newBit;
  }, "");
};

export const stringifyQuery = (
  queryBits: QueryBit[],
  placeholderGenerator: PlaceholderGenerator
): QueryAndParams => {
  const initAcc: QueryAccumulator = {
    paramIndex: 0,
    stringBits: [],
    params: [],
  };

  const result = queryBits.reduce((acc, strOrParam) => {
    const { paramIndex, stringBits, params } = acc;

    if (strOrParam.type === "string") {
      return {
        paramIndex: paramIndex,
        stringBits: [...stringBits, strOrParam],
        params,
      };
    }

    return {
      paramIndex: paramIndex + 1,
      stringBits: [
        ...stringBits,
        stringBit(placeholderGenerator(paramIndex), strOrParam.spaceAfter),
      ],
      params: [...params, strOrParam.value],
    };
  }, initAcc);

  return {
    queryString: stringifyJoin(result.stringBits, " "),
    params: result.params,
  };
};
