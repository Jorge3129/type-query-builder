import { MethodDictionary } from "../expression-builder/create-expression-buider";

export interface DialectOptions {
  operators: MethodDictionary;
  escapeIdentifier: (name: string) => string;
  generatePlaceholder: (paramIndex: number) => string;
}
