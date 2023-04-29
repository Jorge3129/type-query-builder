import { SelectQueryBuilder } from "./query-builder/select-query-builder";

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

const qb = new SelectQueryBuilder()
  .from(User, "u")
  .from(Post, "p")
  //   .where(cond(({ u, p }) => eq(expr(u.id), expr(p.author_id))))
  .where((c) => c.p.author_id.$isNotNull())
  .where(({ u, p }) =>
    p.text
      .$like(u.name)
      .$and(p.text.$like("%foo%"))
      .$or(u.id.$neq(2))
      .$and(p.author_id.$gt(1))
      .$or(u.id.$isNotNull())
      .$and(true)
  );
// .where(({ u, p }) => p.author_id.$isNull())
// .where(({ u, p }) => u.id.$eq(p.author_id));

// console.log(qb.getTree().whereClause);
console.log(qb.build());
