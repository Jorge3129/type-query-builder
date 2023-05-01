import { QueryComponent } from "../query-stringifier/query-component/query-component";
import { paramComponent } from "../query-stringifier/query-component/query-param-component";
import { Expression } from "./expression";

export class LiteralExpression<T = any> implements Expression {
  public readonly type = "literal";

  constructor(public readonly value: T) {}

  public toQueryComponents(): QueryComponent[] {
    return [paramComponent(this.value)];
  }
}
