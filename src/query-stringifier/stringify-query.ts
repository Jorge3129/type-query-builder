import { QueryAndParams } from "./query";
import { QueryComponent } from "./query-component/query-component";
import {
  QueryTextComponent,
  isTextComponent,
  textComponent,
} from "./query-component/query-text-component";

interface QueryAccumulator {
  paramIndex: number;
  queryTextComponents: QueryTextComponent[];
  params: any[];
}

export type PlaceholderGenerator = (paramIndex: number) => string;

export const stringifyJoin = (bits: QueryComponent[], separator: string) => {
  return bits.reduce((acc, bit, index, { length }) => {
    const isLast = index === length - 1;

    const newSeparator = bit.spaceAfter && !isLast ? separator : "";

    const newBit = bit.value + newSeparator;

    return acc + newBit;
  }, "");
};

export const stringifyQuery = (
  queryBits: QueryComponent[],
  placeholderGenerator: PlaceholderGenerator
): QueryAndParams => {
  const initAcc: QueryAccumulator = {
    paramIndex: 0,
    queryTextComponents: [],
    params: [],
  };

  const result = queryBits.reduce((acc, queryComponent) => {
    const { paramIndex, queryTextComponents, params } = acc;

    if (isTextComponent(queryComponent)) {
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
        textComponent(
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
