import { Expression } from "../expression/expression";
import { ExprBuilder } from "./expression-builder";

export class SelectExpressionListBuilder<Context = {}> {
  private expressions: Expression[] = [];

  public $add<Alias extends string, T>(
    expression: ExprBuilder<T, Alias>
  ): SelectExpressionListBuilder<{
    [K in keyof (Context & Record<Alias, T>)]: (Context & Record<Alias, T>)[K];
  }> {
    this.expressions.push(expression.build());

    return this as any;
  }

  public build(): Expression[] {
    return this.expressions;
  }

  public record(): Context {
    return {} as any;
  }
}
