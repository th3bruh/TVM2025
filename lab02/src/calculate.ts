import { ReversePolishNotationActionDict} from "./rpn.ohm-bundle";

export const rpnCalc = {
  Add(x, y, _) {
      return x.calculate() + y.calculate();
  },
  Mul(x, y, _) {
      return x.calculate() * y.calculate();
  },
  number(x) {
      return parseInt(x.sourceString);
  },
} satisfies ReversePolishNotationActionDict<number>;
