import { QueryFragment } from "../query-stringifier/query-fragment/query-fragment";
import { ToQueryFragmentsConfig } from "../query-stringifier/query-fragment/to-query-fragments";
import { Expression } from "./expression";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { escapeIdentifier } from "../utils/escape-identifier";

const VAR_EXPR_TYPE = "attribute";

export class VariableExpression implements Expression {
  public readonly type = "attribute";

  constructor(public readonly path: string[] = []) {}

  public addPathItem(name: string): VariableExpression {
    return new VariableExpression([...this.path, name]);
  }

  public toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[] {
    const pathString = this.path
      .map((pathBit) =>
        escapeIdentifier(pathBit, config.identifierEscapeChararacter)
      )
      .join(".");

    return [textFragment(pathString)];
  }
}

export const isVariableExpression = (val: unknown): val is VariableExpression =>
  !!val && (val as any).type === VAR_EXPR_TYPE;
