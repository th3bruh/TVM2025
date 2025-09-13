import { ReversePolishNotationActionDict } from "./rpn.ohm-bundle";

export const rpnStackDepth = {
  Add(x, y, _) {
      return {max: Math.max(x.stackDepth.max, x.stackDepth.out + y.stackDepth.max),
              out: x.stackDepth.out + y.stackDepth.out - 1};
  },
  Mul(x, y, _) {
      return {max: Math.max(x.stackDepth.max, x.stackDepth.out + y.stackDepth.max),
              out: x.stackDepth.out + y.stackDepth.out - 1};
  },
  number(x) {
      return {max: 1, out: 1};
  },
} satisfies ReversePolishNotationActionDict<StackDepth>;
export type StackDepth = {max: number, out: number};
