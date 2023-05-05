# Typed Query Builder

This is my experimental pet project aimed at creating a strongly typed SQL query builder.

Here's an example query:

```typescript
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

const { selectQueryBuilder, $litExp } = await createQueryBuilderSuite(
  postgresOptions
);

const qb = selectQueryBuilder()
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
      .$and($litExp(1).$eq(1))
      .$and(u.name.$in("foo", "bar"))
      .$and(sum(u.age).$eq(1))
  )
  .select(({ u }) => u.name)
  .select(({ p }) => p.author_id)
  .select(({ p }) => p.createdAt);

const result = await qb.getMany();
```

This will construct the following query:

```postgres-sql
SELECT "u"."name", "p"."author_id", "p"."createdAt" FROM "User" AS "u", "Post" AS "p" WHERE "p"."text" LIKE "u"."name" AND "p"."text" LIKE $1 OR "u"."id" != $2
OR "u"."id" + $3 * $4 / $5 - "p"."author_id" AND "p"."author_id" > $6 OR "u"."id" IS NOT NULL AND "u"."name" BETWEEN $7 AND $8 AND $9 = $10 AND "u"."name" IN ($11,
$12) AND SUM("u"."age") = $13
```

The type of the result will be automatically inferred to be:

```typescript
type Result = {
  name: string;
  author_id: number;
  createdAt: Date;
}[];
```
