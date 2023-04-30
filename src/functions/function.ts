import { FunctionCallExpression } from "../expression/function-call-expression";

export type QueryFunctionDef = (...args: any[]) => FunctionCallExpression;
