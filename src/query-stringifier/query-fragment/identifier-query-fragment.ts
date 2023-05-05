import { QueryFragmentBase } from "./query-fragment";

const IDENTIFIER_FRAGMENT_TYPE = "identifierQueryFragment";

export class IdentifierQueryFragment
  implements QueryFragmentBase<IdentifierQueryFragment>
{
  public readonly type = IDENTIFIER_FRAGMENT_TYPE;

  constructor(
    public readonly path: string[],
    public readonly spaceAfter = true
  ) {}

  public setSpaceAfter(spaceAfter: boolean) {
    return new IdentifierQueryFragment(this.path, spaceAfter);
  }
}

export const identifierFragment = (
  path: string[],
  spaceAfter = true
): IdentifierQueryFragment => new IdentifierQueryFragment(path, spaceAfter);

export const isIdentifierQueryFragment = (
  val: unknown
): val is IdentifierQueryFragment =>
  !!val && (val as IdentifierQueryFragment).type === IDENTIFIER_FRAGMENT_TYPE;
