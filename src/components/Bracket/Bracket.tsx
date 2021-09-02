import * as React from 'react';
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
      {type == BracketType.left && '('}
      {type == BracketType.right && ')'}
      {type == BracketType.dash && '-'}
    </span>
  );
};

export default Bracket;
