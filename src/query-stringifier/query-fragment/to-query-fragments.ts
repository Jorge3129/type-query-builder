import { QueryFragment } from "./query-fragment";

export interface ToQueryFragmentsConfig {
  escapeChar: string;
}

export interface ToQueryFragments {
  toQueryFragments(config: ToQueryFragmentsConfig): QueryFragment[];
}
