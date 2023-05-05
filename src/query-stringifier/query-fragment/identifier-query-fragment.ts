import { QueryFragmentBase } from "./query-fragment";

const IDENTIFIER_FRAGMENT_TYPE = "identifierQueryFragment";

export class IdentifierQueryFragment
  implements QueryFragmentBase<IdentifierQueryFragment>
{
  public readonly type = IDENTIFIER_FRAGMENT_TYPE;

  constructor(
    public readonly name: string,
    public readonly spaceAfter = true
  ) {}

  public setSpaceAfter(spaceAfter: boolean) {
    return new IdentifierQueryFragment(this.name, spaceAfter);
  }
}

export const identifierFragment = (
  name: string,
  spaceAfter = true
): IdentifierQueryFragment => new IdentifierQueryFragment(name, spaceAfter);

export const isIdentifierQueryFragment = (
  val: unknown
): val is IdentifierQueryFragment =>
  !!val && (val as IdentifierQueryFragment).type === IDENTIFIER_FRAGMENT_TYPE;
