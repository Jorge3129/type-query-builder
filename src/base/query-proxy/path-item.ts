import { Param, opDict } from "../types/operators";

export type VarPath = {
  type: "varpath";
  path: string[];
};

export type OpPath<T = any> = {
  type: "operator";
  name: string;
  args: (PathItem<T> | T)[];
};

const isOpPath = (arg: unknown): arg is OpPath => {
  return (arg as any).type === "operator";
};

const isVarPath = (arg: unknown): arg is VarPath => {
  return (arg as any).type === "varpath";
};

export type PathItem<T = any> = VarPath | OpPath<T>;

const identifier = (name: string) => `"${name}"`;

const buildVarPath = (varpath: VarPath): (string | Param)[] => {
  return varpath.path.map(identifier);
};

const buildOpPath = <T = any>(opPath: OpPath<T>): (string | Param)[] => {
  const { args, name } = opPath;

  const builtArgs = args.map(buildPathItemOrT);

  const items = (opDict as any as Record<string, (...args: any[]) => string[]>)[
    name
  ](...builtArgs);

  return items.filter((x) => !!x);
};

export const buildPathItem = <T = any>(
  pathItem: PathItem<T>
): (string | Param)[] => {
  if (pathItem.type === "operator") {
    return buildOpPath(pathItem);
  }

  return buildVarPath(pathItem);
};

export const buildPathItemOrT = <T = any>(
  pathItem: PathItem<T> | T
): (string | Param)[] => {
  if (pathItem === undefined) {
    return [];
  }

  if (isOpPath(pathItem)) {
    return buildOpPath(pathItem);
  }

  if (isVarPath(pathItem)) {
    return buildVarPath(pathItem);
  }

  return pathItem + "";
};
