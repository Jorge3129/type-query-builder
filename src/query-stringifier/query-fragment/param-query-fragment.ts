import { QueryFragmentBase } from "./query-fragment";

const PARAM_FRAGMENT_TYPE = "paramQueryFragment";

export class ParamQueryFragment<T = any>
  implements QueryFragmentBase<ParamQueryFragment>
{
  public readonly type = PARAM_FRAGMENT_TYPE;

  constructor(public readonly value: T, public readonly spaceAfter = true) {}

  public setSpaceAfter(spaceAfter: boolean) {
    return new ParamQueryFragment(this.value, spaceAfter);
  }
}

export const paramFragment = <T>(
  value: T,
  spaceAfter = true
): ParamQueryFragment<T> => new ParamQueryFragment(value, spaceAfter);

export const isParamQueryFragment = (val: unknown): val is ParamQueryFragment =>
  !!val && (val as ParamQueryFragment).type === PARAM_FRAGMENT_TYPE;
