import { Expression } from "../../expression/expression";
import { QueryFragmentBase } from "./query-fragment";

const EXPRESSION_FRAGMENT_TYPE = "expressionQueryFragment";

export class ExpressionQueryFragment
  implements QueryFragmentBase<ExpressionQueryFragment>
{
  public readonly type = EXPRESSION_FRAGMENT_TYPE;

  constructor(
    public readonly expression: Expression,
    public readonly spaceAfter = true
  ) {}

  public setSpaceAfter(spaceAfter: boolean) {
    return new ExpressionQueryFragment(this.expression, spaceAfter);
  }
}

export const expressionFragment = (
  expression: Expression,
  spaceAfter = true
): ExpressionQueryFragment =>
  new ExpressionQueryFragment(expression, spaceAfter);

export const isExpressionQueryFragment = (
  val: unknown
): val is ExpressionQueryFragment =>
  !!val && (val as ExpressionQueryFragment).type === EXPRESSION_FRAGMENT_TYPE;
