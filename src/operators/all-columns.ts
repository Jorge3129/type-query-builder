import { SelectExpressionListBuilder } from "../expression-builder/expression-builder";
import { VariableExpression } from "../expression/variable-expression";
import { expressionFragment } from "../query-stringifier/query-fragment/expression-query-fragment";
import { textFragment } from "../query-stringifier/query-fragment/text-query-fragment";
import { OperatorDictionary } from "./operator-dictionary";

export type AllColumns<Model> = {
  $allColumns(): SelectExpressionListBuilder<Model>;
};

export const allColumnsDict: OperatorDictionary<AllColumns<any>> = {
  $allColumns: (table: VariableExpression) =>
    new (class {
      constructor(public readonly table: VariableExpression) {}

      type: "allColumns";

      toQueryFragments() {
        return [
          expressionFragment(table, false),
          textFragment(".", false),
          textFragment("*"),
        ];
      }
    })(table),
};
