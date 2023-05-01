import { QueryComponentBase } from "./query-component";

export class QueryParamComponent<T = any>
  implements QueryComponentBase<QueryParamComponent>
{
  public readonly type = "param";

  constructor(public readonly value: T, public readonly spaceAfter = true) {}

  public setSpaceAfter(spaceAfter: boolean) {
    return new QueryParamComponent(this.value, spaceAfter);
  }
}

export const paramComponent = <T>(
  value: T,
  spaceAfter = true
): QueryParamComponent<T> => new QueryParamComponent(value, spaceAfter);
