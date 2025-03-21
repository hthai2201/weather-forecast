import { ArrowUp } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
  deg?: number;
}

const WindDirectionIcon = (props: Props) => {
  const { deg = 0, className } = props;
  return (
    <ArrowUp
      className={className}
      style={{
        transform: `rotate(${deg + 180}deg)`,
        transformOrigin: 'center',
      }}
    />
  );
};

export default WindDirectionIcon;
