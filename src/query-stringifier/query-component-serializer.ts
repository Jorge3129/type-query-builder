import { QueryComponent } from "./query-component/query-component";

export interface QueryComponentSerializerConfig {
  escapeChar: string;
}

export interface QueryComponentSerializer {
  toQueryComponents(config: QueryComponentSerializerConfig): QueryComponent[];
}
