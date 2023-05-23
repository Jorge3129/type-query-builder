import { postgresOptions } from "../driver-options/postgres/postgres.options";
import { createQueryBuilderSuite } from "../query-builder-suite/create-query-builder-suite";
import { QueryBuilderSuite } from "../query-builder-suite/query-builder-suite";

class User {
  id: number;
  name: string;
  age: number;
}

class Post {
  id: number;
  text: string;
  author_id: number;
  likes: number;
  isPublic: boolean;
  createdAt: Date;
}

describe("SelectQueryBuilder", () => {
  let typeQB: QueryBuilderSuite;

  beforeAll(async () => {
    typeQB = await createQueryBuilderSuite(postgresOptions);
  });

  it("should build where clause", () => {
    const qb = typeQB
      .selectQueryBuilder()
      .from(User, "u")
      .where(({ u }) => u.name.$like("%foo%").$and(typeQB.$litExp(1).$eq(2)))
      .select(({ u }) => u.age);

    const { query: queryString, params } = qb.getQueryAndParams();

    expect(queryString).toBe(
      `SELECT "u"."age" FROM "User" AS "u" WHERE "u"."name" LIKE $1 AND $2 = $3`
    );

    expect(params).toEqual(["%foo%", 1, 2]);
  });

  it("should create alias", () => {
    const qb = typeQB
      .selectQueryBuilder()
      .from(User, "u")
      .where(({ u }) => u.name.$like("%foo%").$and(typeQB.$litExp(1).$eq(2)))
      .select(({ u }) => u.age.$plus(u.id.$times(2)).$as("g"));

    const { query: queryString, params } = qb.getQueryAndParams();

    expect(queryString).toBe(
      `SELECT "u"."age" + "u"."id" * $1 AS "g" FROM "User" AS "u" WHERE "u"."name" LIKE $2 AND $3 = $4`
    );

    expect(params).toEqual([2, "%foo%", 1, 2]);
  });

  describe("JOIN", () => {
    it("should create INNER JOIN", () => {
      const qb = typeQB
        .selectQueryBuilder()
        .from(User, "u")
        .innerJoin(Post, "p", ({ p, u }) => p.author_id.$eq(u.id))
        .select(({ u }) => u.age);

      const { query } = qb.getQueryAndParams();

      expect(query).toBe(
        `SELECT "u"."age" FROM "User" AS "u" INNER JOIN "Post" AS "p" ON "p"."author_id" = "u"."id"`
      );
    });

    it("should create all columns", () => {
      const qb = typeQB
        .selectQueryBuilder()
        .from(User, "u")
        .innerJoin(Post, "p", ({ p, u }) => p.author_id.$eq(u.id))
        .select$(($, { u }) => u.$allColumns())
        .select$(($, { p }) => p.$allColumns());

      expect(qb.getQueryAndParams().query).toBe(
        `SELECT "u".*, "p".* FROM "User" AS "u" INNER JOIN "Post" AS "p" ON "p"."author_id" = "u"."id"`
      );
    });
  });

  it("should create GROUP BY", () => {
    const qb = typeQB
      .selectQueryBuilder()
      .from(User, "u")
      .leftJoin(Post, "p", ({ p, u }) => p.author_id.$eq(u.id))
      .select(({ u }) => u.name)
      .select(({ p }, { count }) => count(p.id).$as("post_count"))
      .groupBy(({ u }) => u.name);

    const { query } = qb.getQueryAndParams();

    expect(query).toBe(
      `SELECT "u"."name", COUNT("p"."id") AS "post_count" FROM "User" AS "u" ` +
        `LEFT JOIN "Post" AS "p" ON "p"."author_id" = "u"."id" ` +
        `GROUP BY "u"."name"`
    );
  });

  it("should correctly space function args", () => {
    const qb = typeQB
      .selectQueryBuilder()
      .from(User, "u")
      .select(({ u }, { sum }) => sum(u.age));

    expect(qb.getQueryAndParams().query).toBe(
      `SELECT SUM("u"."age") FROM "User" AS "u"`
    );
  });

  it("should select list", () => {
    const qb = typeQB
      .selectQueryBuilder()
      .from(User, "u")
      .select$(($, { u }, { sum }) =>
        $(sum(u.age).$as("sum"))
          .$add(typeQB.$litExp(1))
          .$add(u.id)
          .$add(u.name)
          .$add(u.age)
      );

    expect(qb.getQueryAndParams().query).toBe(
      `SELECT SUM("u"."age") AS "sum", $1, "u"."id", "u"."name", "u"."age" FROM "User" AS "u"`
    );
  });

  it("should build smth", () => {
    const qb = typeQB
      .selectQueryBuilder()
      .from(User, "u")
      .from(Post, "p")
      .where(({ u, p }, { sum }) =>
        p.text
          .$like(u.name)
          .$and(p.text.$like("%foo%"))
          .$or(u.id.$neq(2))
          .$or(u.id.$plus(1).$times(2).$div(4).$minus(p.author_id))
          .$and(p.author_id.$gt(1))
          .$or(u.id.$isNotNull())
          .$and(u.name.$between("a", "b"))
          .$and(typeQB.$litExp(1).$eq(1))
          .$and(u.name.$in("foo", "bar"))
          .$and(sum(u.age).$eq(1))
      )
      .select(({ u }) => u.name)
      .select$((_, { u }) => u.$allColumns());
    // .select(({ p }) => p.author_id);
    // .select(({ p }) => p.createdAt);

    console.log(qb.getQueryAndParams().query);

    expect(qb.getQueryAndParams()).toBeDefined();
  });
});
