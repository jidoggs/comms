import { ReactNode } from 'react';

type Props = {
  condition?: boolean;
  trueArg: ReactNode;
  falseArg: ReactNode;
};

function Conditional({ trueArg, falseArg, condition }: Props) {
  if (condition) {
    return trueArg;
  }
  return falseArg;
}

export default Conditional;
