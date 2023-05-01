import { ParamQueryFragment } from "./param-query-fragment";
import { TextQueryFragment } from "./text-query-fragment";

export interface QueryFragmentBase<T extends QueryFragmentBase<any>> {
  setSpaceAfter(spaceAfter: boolean): T;
}

export type QueryFragment = TextQueryFragment | ParamQueryFragment;
