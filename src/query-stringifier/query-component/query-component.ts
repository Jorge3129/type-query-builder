import { QueryParamComponent } from "./query-param-component";
import { QueryTextComponent } from "./query-text-component";

export interface QueryComponentBase<T extends QueryComponentBase<any>> {
  setSpaceAfter(spaceAfter: boolean): T;
}

export type QueryComponent = QueryTextComponent | QueryParamComponent;
