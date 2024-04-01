import { mergeClassName } from '@/common/utils';
import { Button, ButtonProps, Tooltip } from 'antd';
import React from 'react';

type ClassName = 'container' | 'button';

interface CustomInputProps extends Omit<ButtonProps, 'className'> {
  description?: string;
  className?: string | Partial<Record<ClassName, string>>;
  borderLeft?: boolean;
  borderRight?: boolean;
}

function CustomButton({
  className,
  children,
  description,
  size,
  block,
  title,
  borderLeft,
  borderRight,
  ...props
}: CustomInputProps) {
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
        borderRight || borderLeft
          ? 'relative before:absolute before:top-1/2 before:h-7 before:w-px before:-translate-y-1/2 before:bg-custom-gray_500'
          : '',
        borderRight ? 'before:-right-2.5' : '',
        borderLeft ? 'before:-left-2.5' : '',
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
        <Tooltip title={description || title}>
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
