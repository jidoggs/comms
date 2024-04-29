import React, { ReactNode } from 'react';
import { mergeClassName } from '@/common/utils';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  hasChild?: ReactNode;
}

function SectionItem({ children, hasChild, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={mergeClassName(
        'flex min-w-[284px] items-center gap-x-2.5 rounded-md px-4 py-1 text-left text-custom-main',
        className
      )}
    >
      <span className="max-w-[296px] flex-1">{children}</span>
      {hasChild}
    </button>
  );
}

export default SectionItem;
