import { QueryFragment } from "./query-fragment";

export interface ToQueryFragmentsConfig {
  identifierEscapeChararacter: string;
}

export interface ToQueryFragments {
  toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[];
}
