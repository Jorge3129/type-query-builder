import { cond } from "../f/cond";
import { eq1 } from "../f/expr";
import { BaseQueryBuilder } from "./base-query-builder";

class User {
  id: number;
  name: string;

  static getFieldNames() {
    return ["id", "name"];
  }
}

class Post {
  id: number;
  author_id: number;
  likes: number;

  static getFieldNames() {
    return ["id", "author_id", "likes"];
  }
}

const query = new BaseQueryBuilder()
  .from(User, "u")
  .from(Post, "p")
  //   .where(cond(({ u, p }) => eq(expr(u.id), expr(p.author_id))))
  .where(cond(({ u, p }) => eq1(u.id, p.author_id)))
  .build();

console.log(query); // Output: FROM User as u FROM Post as p WHERE u.id = p.author_id
