import { QueryFragmentBase } from "./query-fragment";

export class TextQueryFragment implements QueryFragmentBase<TextQueryFragment> {
  public readonly type = "textQueryFragment";

  constructor(
    public readonly value: string,
    public readonly spaceAfter = true
  ) {}

  public setSpaceAfter(spaceAfter: boolean) {
    return new TextQueryFragment(this.value, spaceAfter);
  }
}

export const textFragment = (
  value: string,
  spaceAfter = true
): TextQueryFragment => new TextQueryFragment(value, spaceAfter);

export const isTextQueryFragment = (val: unknown): val is TextQueryFragment =>
  !!val && (val as TextQueryFragment).type === "textQueryFragment";
