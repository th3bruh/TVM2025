import {  MatchResult } from "ohm-js";
import { addMulSemantics } from "./calculate";
import grammar from "./addmul.ohm-bundle";

export function evaluate(content: string): number
{
    return calculate(parse(content));
}
export class SyntaxError extends Error
{
}

function parse(content: string): MatchResult
{
    const result: MatchResult = grammar.match(content);
    if (result.failed()) {
        throw new SyntaxError(result.message);
    }
    return result;
}

function calculate(expression: MatchResult): number
{
    return addMulSemantics(expression).calculate();
}
