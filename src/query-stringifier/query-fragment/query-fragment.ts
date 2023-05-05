import { ExpressionQueryFragment } from "./expression-query-fragment";
import { IdentifierQueryFragment } from "./identifier-query-fragment";
import { ParamQueryFragment } from "./param-query-fragment";
import { TextQueryFragment } from "./text-query-fragment";

export interface QueryFragmentBase<T extends QueryFragmentBase<any>> {
  type: string;

  setSpaceAfter(spaceAfter: boolean): T;
}

export type QueryFragment = TextQueryFragment | ParamQueryFragment;

export type ExtendedQueryFragment =
  | TextQueryFragment
  | ParamQueryFragment
  | IdentifierQueryFragment
  | ExpressionQueryFragment;
