import React from 'react';
import Folder from './icons/Folder';
import { mergeClassName } from '../utils';
import Title from './Title';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  classNames?: {
    title?: string;
    icon?: string;
  };
  iconSize?: number | string;
}

function EmptyList({
  className,
  classNames,
  title,
  iconSize,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={mergeClassName(
        'flex h-full items-center justify-center gap-x-1',
        className
      )}
    >
      <Folder className={classNames?.icon} size={iconSize} />
      <Title className={classNames?.title}>{title ? title : 'Empty'}</Title>
    </div>
  );
}

export default EmptyList;
