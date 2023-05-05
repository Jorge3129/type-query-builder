import { ExtendedQueryFragment } from "../query-fragment/query-fragment";

export const setLastFragmentSpaceAfter = (
  fragments: ExtendedQueryFragment[],
  spaceAfter: boolean
): ExtendedQueryFragment[] => {
  if (!fragments.length) {
    return [];
  }

  return [
    ...fragments.slice(0, -1),
    fragments[fragments.length - 1].setSpaceAfter(spaceAfter),
  ];
};
