import { ExtendedQueryFragment } from "./query-fragment";

export interface ToQueryFragmentsConfig {
  identifierEscapeChararacter: string;
}

export interface ToQueryFragments {
  toQueryFragments(): ExtendedQueryFragment[];
}
