export class QueryTextComponent {
  public readonly type = "queryTextComponent";

  constructor(
    public readonly value: string,
    public readonly spaceAfter = true
  ) {}

  public modifySpace(spaceAfter: boolean) {
    return new QueryTextComponent(this.value, spaceAfter);
  }
}

export const textComponent = (
  value: string,
  spaceAfter = true
): QueryTextComponent => new QueryTextComponent(value, spaceAfter);

export const isTextComponent = (val: unknown): val is QueryTextComponent =>
  !!val && (val as any).type === "queryTextComponent";
