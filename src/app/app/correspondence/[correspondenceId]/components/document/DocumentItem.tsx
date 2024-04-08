import React, { ReactNode } from 'react';
import { mergeClassName } from '@/common/utils';

interface Props
  extends React.InputHTMLAttributes<Omit<HTMLButtonElement, 'type'>> {
  icon: ReactNode;
  value: string;
  hasChild?: ReactNode;
}

function DocumentItem({
  icon,
  value,
  onClick,
  datatype,
  hasChild,
  className,
}: Props) {
  return (
    <button
      datatype={datatype}
      className={mergeClassName(
        'flex min-w-[284px] items-center gap-x-1 rounded-10 p-2 text-left',
        className
      )}
      onClick={onClick}
    >
      {icon}
      <span className="flex items-center gap-2">{value}</span>
      {hasChild}
    </button>
  );
}

export default DocumentItem;
