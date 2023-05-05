import { SelectQueryBuilder } from "../query-builder/select-query-builder";
import { Attribute } from "../types/attribute";

export interface QueryBuilderSuite {
  selectQueryBuilder: () => SelectQueryBuilder;
  $litExp: <T>(value: T) => Attribute<T>;
  disconnect: () => Promise<void>;
}
