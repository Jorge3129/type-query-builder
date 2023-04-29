import { litExp } from "../expression-builder/lit-exp";
import { SelectQueryBuilder } from "./select-query-builder";

class User {
  id: number;
  name: string;
}

class Post {
  id: number;
  text: string;
  author_id: number;
  likes: number;
}

describe("SelectQueryBuilder", () => {
  it("should build where clause", () => {
    const qb = new SelectQueryBuilder()
      .from(User, "u")
      .where(({ u }) => u.name.$like("%foo%").$and(litExp(1).$eq(2)));

    const { queryString, params } = qb.buildQueryAndParams();

    expect(queryString).toBe(
      `SELECT 1 FROM User AS u WHERE "u"."name" LIKE $1 AND $2 = $3`
    );

    expect(params).toEqual(["%foo%", 1, 2]);
  });

  it("should build smth", () => {
    const qb = new SelectQueryBuilder()
      .from(User, "u")
      .from(Post, "p")
      .where(({ u, p }) =>
        p.text
          .$like(u.name)
          .$and(p.text.$like("%foo%"))
          .$or(u.id.$neq(2))
          .$and(p.author_id.$gt(1))
          .$or(u.id.$isNotNull())
          .$and(litExp(1).$eq(1))
      );

    expect(qb.build()).toBeDefined();
  });
});
