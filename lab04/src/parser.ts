import { IterationNode, MatchResult, NonterminalNode } from 'ohm-js';
import { arithGrammar, ArithmeticActionDict, ArithmeticSemantics, SyntaxError } from '../../lab03';
import { Expr, Add, Sub, Mul, Div, Neg, Par, Num, Var, BinOpType, UnOpType } from './ast';


function parseBinOP(first: NonterminalNode, ops: IterationNode, rest: IterationNode,
                    types: Record<string, BinOpType>): Expr {
    return rest.children.reduce(
        (lhs: Expr, rhs: NonterminalNode, idx: number): Expr => {
            return {
                type: types[ops.child(idx).sourceString],
                arg0: lhs,
                arg1: rhs.parse()
            };
        }, first.parse());
}

function parseUnOP(x: NonterminalNode, type: UnOpType): Expr
{
    return {type: type, arg: x.parse()};
}

export const getExprAst: ArithmeticActionDict<Expr> = {
    Sum(first, ops, rest) {
        return parseBinOP(first, ops, rest, {'+': 'add', '-': 'sub'});
    },
    Prod(first, ops, rest) {
        return parseBinOP(first, ops, rest, {'*': 'mul', '/': 'div'});
    },
    Neg(_, x) {
        return parseUnOP(x, 'neg');
    },
    Par(_l, x, _r) {
        return parseUnOP(x, 'par');
    },
    var(_, __) {
        return {type: 'var', name: this.sourceString};
    },
    number(_) {
        return {type: 'num', value: parseInt(this.sourceString)};
    },
}
export const semantics = arithGrammar.createSemantics();
semantics.addOperation("parse()", getExprAst);

export interface ArithSemanticsExt extends ArithmeticSemantics
{
    (match: MatchResult): ArithActionsExt
}

export interface ArithActionsExt 
{
    parse(): Expr
}

export function parseExpr(source: string): Expr
{
    const result: MatchResult = arithGrammar.match(source);
    if (result.failed()) {
        throw new SyntaxError(result.message);
    }
    return semantics(result).parse();
}
