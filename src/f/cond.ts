export type Cond<Context> = (context: Context) => string;

export function cond<Context>(cb: (context: Context) => string) {
  return (context: Context) => cb(context);
}
