import {  MatchResult } from "ohm-js";
import grammar from "./rpn.ohm-bundle";
import { rpnSemantics } from "./semantics";

export function evaluate(source: string): number
{ 
    return rpnSemantics(parse(source)).calculate();
}
export function maxStackDepth(source: string): number
{ 
    return rpnSemantics(parse(source)).stackDepth.max;
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

