export class QueryParamComponent<T = any> {
  public readonly type = "param";

  constructor(public readonly value: T, public readonly spaceAfter = true) {}

  public modifySpace(spaceAfter: boolean) {
    return new QueryParamComponent(this.value, spaceAfter);
  }
}

export const paramComponent = <T>(
  value: T,
  spaceAfter = true
): QueryParamComponent<T> => new QueryParamComponent(value, spaceAfter);
