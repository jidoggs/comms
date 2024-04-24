import React from 'react';
import { mergeClassName } from '../utils';

type OtherProps = {
  bold?: boolean;
  semibold?: boolean;
  almostbold?: boolean;
  small?: boolean;
};

type Props =
  | ({
      tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    } & React.HTMLAttributes<HTMLHeadingElement> &
      OtherProps)
  | ({
      tag?: 'p';
    } & React.HTMLAttributes<HTMLParagraphElement> &
      OtherProps)
  | ({
      tag: 'span';
    } & React.HTMLAttributes<HTMLSpanElement> &
      OtherProps);

const Title = ({
  tag = 'p',
  bold,
  small,
  semibold,
  almostbold,
  className,
  ...props
}: Props) => {
  const Tag = tag;

  return (
    <Tag
      {...props}
      className={mergeClassName(
        'text-custom-main',
        tag === 'h1' ? 'text-4xl' : '',
        tag === 'h2' ? 'text-3xl' : '',
        tag === 'h3' ? 'text-2xl' : '',
        tag === 'h4' ? 'text-xl' : '',
        tag === 'h5' ? 'text-lg' : '',
        tag === 'h6' ? 'text-base' : '',
        tag === 'p' || tag === 'span'
          ? 'text-sm font-450 leading-[17.71px]'
          : '',
        small ? 'text-xs' : '',
        (tag.includes('h') && tag !== 'h5' && tag !== 'h6') || bold
          ? 'font-bold'
          : '',
        semibold ? 'font-medium' : '',
        almostbold ? 'font-semibold' : '',
        !bold && !semibold && !almostbold ? 'font-450' : '',
        className
      )}
    />
  );
};

export default Title;
