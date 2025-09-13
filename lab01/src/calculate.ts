import { Dict, MatchResult, Semantics } from "ohm-js";
import grammar, { AddMulActionDict } from "./addmul.ohm-bundle";

export const addMulSemantics: AddMulSemantics = grammar.createSemantics() as AddMulSemantics;


const addMulCalc = {
  Add_op(x, _, y) {
      return x.calculate() + y.calculate();
  },
  Mul_op(x, _, y) {
      return x.calculate() * y.calculate();
  },
  Par(_l, x, _r) {
      return x.calculate();
  },
  number(x) {
      return parseInt(x.sourceString);
  },
} satisfies AddMulActionDict<number>

addMulSemantics.addOperation<Number>("calculate()", addMulCalc);

interface AddMulDict  extends Dict {
    calculate(): number;
}

interface AddMulSemantics extends Semantics
{
    (match: MatchResult): AddMulDict;
}
