import { litExp } from "../expression-builder/lit-exp";
import { SelectQueryBuilder } from "./select-query-builder";

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
  it("should build where clause", () => {
    const qb = new SelectQueryBuilder()
      .from(User, "u")
      .where(({ u }) => u.name.$like("%foo%").$and(litExp(1).$eq(2)))
      .select(({ u }) => u.age);

    const { queryString, params } = qb.buildQueryAndParams();

    qb.getOne();

    expect(queryString).toBe(
      `SELECT "u"."age" FROM "User" AS "u" WHERE "u"."name" LIKE $1 AND $2 = $3`
    );

    expect(params).toEqual(["%foo%", 1, 2]);
  });

  it("should build smth", () => {
    const qb = new SelectQueryBuilder()
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
          .$and(litExp(1).$eq(1))
          .$and(u.name.$in("foo", "bar"))
          .$and(sum(u.age).$eq(1))
      )
      .selectAs(({ u }) => u.name, "name")
      .selectAs(({ p }) => p.author_id, "authorId")
      .selectAs(({ p }) => p.createdAt, "date");

    console.log(qb.build());

    expect(qb.build()).toBeDefined();
  });
});
