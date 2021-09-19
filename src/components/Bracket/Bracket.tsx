import * as React from 'react';
import { symbols } from '@utils/symbols';
import './Bracket.modules.scss';

export enum BracketType {
  left = 'left',
  right = 'right',
  dash = 'dash',
}

export type BracketProps = {
  type?: BracketType;
};

const Bracket: React.FC<BracketProps> = ({ type }: BracketProps) => {
  return (
    <span styleName="bracket">
      {type == BracketType.left && symbols.leftBracket}
      {type == BracketType.right && symbols.rightBracket}
      {type == BracketType.dash && symbols.dash}
    </span>
  );
};

export default Bracket;
