import { ExtendedQueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { Expression } from "./expression";
import { identifierFragment } from "../query-stringifier/query-fragment/identifier-query-fragment";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";

const VAR_EXPR_TYPE = "attribute";

export class VariableExpression implements Expression {
  public readonly type = VAR_EXPR_TYPE;

  constructor(public readonly path: string[] = []) {}

  public addPathItem(name: string): VariableExpression {
    return new VariableExpression([...this.path, name]);
  }

  public toQueryFragments(): ExtendedQueryFragment[] {
    return this.path.flatMap((name, index, { length }) => {
      if (index !== length - 1) {
        return [identifierFragment(name, false), textFragment(".", false)];
      }

      return [identifierFragment(name)];
    });
  }
}

export const isVariableExpression = (val: unknown): val is VariableExpression =>
  !!val && (val as any).type === VAR_EXPR_TYPE;
