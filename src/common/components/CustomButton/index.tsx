import { mergeClassName } from '@/common/utils';
import { Button, ButtonProps, Tooltip } from 'antd';
import React from 'react';

type ClassName = 'container' | 'button';

interface CustomInputProps extends Omit<ButtonProps, 'className'> {
  description?: string;
  className?: string | Partial<Record<ClassName, string>>;
}

function CustomButton({
  className,
  children,
  description,
  size,
  block,
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
        typeof className !== 'string' ? className?.container : ''
      )}
    >
      {children || !description ? (
        <Button className={btnClassName} size={size} block={block} {...props}>
          {children}
        </Button>
      ) : (
        <Tooltip title={description}>
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
