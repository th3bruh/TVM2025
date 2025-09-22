import { MatchResult, Node } from "ohm-js";
import grammar, { ArithmeticActionDict, ArithmeticSemantics } from "./arith.ohm-bundle";

export const arithSemantics: ArithSemantics = grammar.createSemantics() as ArithSemantics;


const arithCalc = {
    Sum(x, ops, y) {
      let result: number = x.calculate(this.args.params); 

      for (let i: number = 0; i < y.children.length; i++) {
        switch(ops.child(i).sourceString) {
          case "+":
            result += y.child(i).calculate(this.args.params);
          break;
          case "-":
            result -= y.child(i).calculate(this.args.params);
          break;
          default:
          throw "Bug: Unexpected operrand: " + ops.child(i).sourceString;
        }
      }
      return result;
    },
    Prod(x, ops, y) {
      let result: number = x.calculate(this.args.params); 

      for (let i: number = 0; i < y.children.length; i++) {
        switch(ops.child(i).sourceString) {
          case "*":
            result *= y.child(i).calculate(this.args.params);
          break;
          case "/":
            const rhs: number = y.child(i).calculate(this.args.params);
            if (0 == rhs) {
              throw new Error;
            }
            result /= rhs;
          break;
          default:
          throw "Bug: Unexpected operrand: " + ops.child(i).sourceString;
        }
      }
      return result;
    },
    Neg(_, x) {
        return - x.calculate(this.args.params);
    },
    Par(_l, x, _r) {
        return x.calculate(this.args.params);
    },
    number(x) {
        return parseInt(x.sourceString);
    },
    var(_, __) {
        return this.args.params[this.sourceString];
    },
} satisfies ArithmeticActionDict<number | undefined>;



arithSemantics.addOperation<Number>("calculate(params)", arithCalc);


export interface ArithActions {
    calculate(params: {[name:string]:number}): number;
}

export interface ArithSemantics extends ArithmeticSemantics
{
    (match: MatchResult): ArithActions;
}
