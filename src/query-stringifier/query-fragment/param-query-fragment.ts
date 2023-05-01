import { QueryFragmentBase } from "./query-fragment";

export class ParamQueryFragment<T = any>
  implements QueryFragmentBase<ParamQueryFragment>
{
  public readonly type = "param";

  constructor(public readonly value: T, public readonly spaceAfter = true) {}

  public setSpaceAfter(spaceAfter: boolean) {
    return new ParamQueryFragment(this.value, spaceAfter);
  }
}

export const paramFragment = <T>(
  value: T,
  spaceAfter = true
): ParamQueryFragment<T> => new ParamQueryFragment(value, spaceAfter);
