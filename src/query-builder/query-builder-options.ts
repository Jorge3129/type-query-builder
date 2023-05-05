import { DialectOptions } from "../driver-options/dialect-options";
import { DriverAdapter } from "../driver-options/driver";

export type QueryBuilderOptions = {
  dialectOptions: DialectOptions;
  driver: DriverAdapter;
};

export const getDefaultQueryBuilderOptions = (
  options: QueryBuilderOptions
): Required<QueryBuilderOptions> => {
  return {
    dialectOptions: options.dialectOptions,
    driver: options.driver,
  };
};
