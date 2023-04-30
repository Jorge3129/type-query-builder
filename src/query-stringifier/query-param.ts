export class QueryParamBit<T = any> {
  public readonly type = "param";

  constructor(public readonly value: T, public readonly spaceAfter = true) {}

  public modifySpace(spaceAfter: boolean) {
    return new QueryParamBit(this.value, spaceAfter);
  }
}

export class QueryStringBit {
  public readonly type = "string";

  constructor(
    public readonly value: string,
    public readonly spaceAfter = true
  ) {}

  public modifySpace(spaceAfter: boolean) {
    return new QueryStringBit(this.value, spaceAfter);
  }
}

export const paramBit = <T>(value: T, spaceAfter = true): QueryParamBit<T> =>
  new QueryParamBit(value, spaceAfter);

export const stringBit = (value: string, spaceAfter = true): QueryStringBit =>
  new QueryStringBit(value, spaceAfter);

export type QueryBit = QueryStringBit | QueryParamBit;
