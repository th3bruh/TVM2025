export type Expr = Add | Sub | Mul | Div | Neg | Par | Num | Var;

type ExtractOp<T, U> = T extends U ? T : never;

export type BinOp = ExtractOp<Expr, BinOpBase>;
export type UnOp = ExtractOp<Expr, UnOpBase>;

export type BinOpType = BinOp['type'];
export type UnOpType  =  UnOp['type'];
export type ExprType  =  Expr['type'];
export type OpType = BinOpType | UnOpType;


export interface BinOpBase
{
    arg0: Expr;
    arg1: Expr;
}

export interface UnOpBase
{
    arg: Expr;
}


export interface Add extends BinOpBase
{
    type: 'add';
}

export interface Sub extends BinOpBase
{
    type: 'sub';
}

export interface Mul extends BinOpBase
{
    type: 'mul';
}

export interface Div extends BinOpBase
{
    type: 'div';
}

export interface Neg extends UnOpBase
{
    type: 'neg';
}

export interface Par extends UnOpBase
{
    type: 'par';
}

export interface Var
{
    type: 'var';
    name: string;
}

export interface Num
{
    type: 'num';
    value: number;
}

