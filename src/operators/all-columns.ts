import { SelectExpressionListBuilder } from "../expression-builder/expression-list-builder";
import { Expression } from "../expression/expression";
import { VariableExpression } from "../expression/variable-expression";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { ListOperatorDictionary } from "./operator-dictionary";

export type AllColumns<Model> = {
  $allColumns(): SelectExpressionListBuilder<Model>;
};

export class AllColumnsExpression implements Expression {
  constructor(public readonly table: VariableExpression) {}

  type: "allColumns";

  toQueryFragments() {
    return [
      expressionFragment(this.table, false),
      textFragment(".", false),
      textFragment("*"),
    ];
  }
}

export const allColumnsDict: ListOperatorDictionary<AllColumns<any>> = {
  $allColumns: (table: VariableExpression) => [new AllColumnsExpression(table)],
};
