import React from 'react';
import { Button, Tooltip } from 'antd';
import { mergeClassName } from '@/common/utils';
import { CustomButtonProps } from './types';

function CustomButton({
  className,
  children,
  description,
  descriptionPlacement,
  size,
  block,
  title,
  borderLeft,
  borderRight,
  borderBottom,
  borderTop,
  ...props
}: CustomButtonProps) {
  const btnClassName = mergeClassName(
    '!flex items-center only:justify-center group/button',
    block && 'flex-1',
    typeof className === 'string' ? className : className?.button

  );
  return (
    <div
      className={mergeClassName(
        'flex items-center justify-center',
        block && 'w-full',
        borderRight || borderLeft || borderBottom || borderTop
          ? 'relative before:absolute   before:bg-custom-gray_500'
          : '',
        borderRight || borderLeft
          ? 'before:top-1/2 before:h-7 before:w-px before:-translate-y-1/2'
          : '',
        borderBottom || borderTop
          ? 'before:left-1/2 before:h-px before:w-7 before:-translate-x-1/2'
          : '',
        borderRight ? 'before:-right-2.5' : '',
        borderLeft ? 'before:-left-2.5' : '',
        borderBottom ? 'before:-bottom-1' : '',
        borderTop ? 'before:-top-1' : '',
        typeof className !== 'string' ? className?.container : ''
      )}
    >
      {children || !description ? (
        <Button
          className={btnClassName}
          size={size}
          block={block}
          title={title}
          {...props}
        >
          {children}
        </Button>
      ) : (
        <Tooltip placement={descriptionPlacement} title={description || title}>
          <Button
            className={btnClassName}
            size={description ? 'small' : size}
            block={block}
            {...props}
          >
            {children}
          </Button>
        </Tooltip>
      )}
    </div>
  );
}

export default CustomButton;
