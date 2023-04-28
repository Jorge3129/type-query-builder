import { BaseQueryBuilder } from "./base-query-builder";
import { cond } from "./types/cond";

class User {
  id: number;
  name: string;
}

class Post {
  id: number;
  author_id: number;
  likes: number;
}

const query = new BaseQueryBuilder()
  .from(User, "u")
  .from(Post, "p")
  //   .where(cond(({ u, p }) => eq(expr(u.id), expr(p.author_id))))
  .where(cond(({ u, p }) => u.id.eq(1)))
  .build();

console.log(query);
