import * as React from 'react';
import './Bracket.modules.scss';

export enum Side {
  left = 'left',
  right = 'right'
}

type BracketProps = {
  side: Side;
};

const Bracket: React.FC<BracketProps> = ({ side }: BracketProps) => {
  return (
    <span className="bracket">
      {side == Side.left && '('}
      {side == Side.right && ')'}
    </span>
  );
};

export default Bracket;
