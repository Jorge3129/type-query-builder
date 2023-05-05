import { QueryFragment } from "../query-fragment/query-fragment";

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
