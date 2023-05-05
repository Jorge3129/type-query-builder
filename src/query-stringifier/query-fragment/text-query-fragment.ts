import { QueryFragmentBase } from "./query-fragment";

const TEXT_FRAGMENT_TYPE = "textQueryFragment";

export class TextQueryFragment implements QueryFragmentBase<TextQueryFragment> {
  public readonly type = TEXT_FRAGMENT_TYPE;

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
  !!val && (val as TextQueryFragment).type === TEXT_FRAGMENT_TYPE;
