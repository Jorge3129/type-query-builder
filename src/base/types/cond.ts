import { Expr } from "./expr";

export type Cond<Context> = (context: Context) => Expr<boolean>;

export function cond<Context>(cb: (context: Context) => Expr<boolean>) {
  return (context: Context) => cb(context);
}
