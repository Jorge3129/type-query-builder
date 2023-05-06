require("dotenv").config();
import { PostgresConfig } from "../src/driver-options/postgres/postgres-driver";
import { postgresOptions } from "../src/driver-options/postgres/postgres.options";
import JoinType from "../src/expression/clauses/join-clause";
import { createQueryBuilderSuite } from "../src/query-builder-suite/create-query-builder-suite";

export class Category {
  category_number: number;
  category_name: string;
  products_count?: string;
}

export class Product {
  id_product: number;
  category_number: number;
  product_name: string;
  characteristics: string;
}

const main = async () => {
  const conf = {
    get(id: string): string | undefined {
      return process.env[id];
    },
  };

  const { selectQueryBuilder, $litExp, disconnect } =
    await createQueryBuilderSuite(postgresOptions, <PostgresConfig>{
      user: conf.get("DB_USER") ?? "",
      host: conf.get("DB_HOST") ?? "",
      database: conf.get("DB_NAME") ?? "",
      password: conf.get("DB_PWD") ?? "",
      port: parseInt(conf.get("DB_PORT") ?? ""),
    });

  const results = await selectQueryBuilder()
    .from(Category, "c")
    .leftJoin(Product, "p", ({ p, c }) =>
      p.category_number.$eq(c.category_number)
    )
    .select$(({ c }) => c.$allColumns())
    .select$(({ p }) => p.$allColumns())
    .where(({ c }) => c.category_number.$gt(2))
    .getMany();

  console.log(results);

  await disconnect();
};

main().then(() => {
  process.exit(0);
});
