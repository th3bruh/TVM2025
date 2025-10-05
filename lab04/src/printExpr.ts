import { Expr, Add, Sub, Mul, Div, Neg, Par, Num, Var, BinOp, BinOpType, OpType, ExprType } from './ast';

function printBinOp(e: BinOp, oper: string): string
{
  return printExpr(e.arg0, e.type, 'l') + ' ' + oper + ' ' + printExpr(e.arg1, e.type, 'r');
}

function isSumType(type: ExprType | undefined): boolean {
  return type === 'add' || type === 'sub';
}

function isProdType(type: ExprType | undefined): boolean {
  return type === 'mul' || type === 'div';
}

function inParType(e: Expr): ExprType {
  return e.type === 'par' ? inParType(e.arg) : e.type;
}

export function printExpr(e: Expr, ctx?: OpType, side?: 'l' | 'r'): string
{
  switch(e.type) {
      case 'add':
          return printBinOp(e, '+');
      case 'sub':
          return printBinOp(e, '-');
      case 'mul':
          return printBinOp(e, '*');
      case 'div':
          return printBinOp(e, '/');
      case 'neg':
          return '-' + printExpr(e.arg, e.type);
      case 'par':
          if (isProdType(ctx) && isSumType(inParType(e.arg)) ||
              (ctx === 'div' && isProdType(inParType(e.arg)) ||
               ctx === 'sub' && isSumType(inParType(e.arg))) &&
              side === 'r') {
              return '(' + printExpr(e.arg, e.type) + ')';
          }
          return printExpr(e.arg, e.type);
      case 'var':
          return e.name;
      case 'num':
          return e.value.toString();
  }
}
