import React from 'react';
import { mergeClassName } from '../utils';

type Props = {
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'nav'
    | 'p'
    | 'btn'
    | 'bread'
    | 'sm';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function Title({ type, children, className, style }: Props) {
  let template: React.JSX.Element | null = null;
  const color = 'text-custom-main';

  switch (type) {
    case 'h1':
      template = (
        <h1
          style={style}
          className={mergeClassName(
            color,
            'circular text-3xl font-bold',
            className
          )}
        >
          {children}
        </h1>
      );
      break;
    case 'h2':
      template = (
        <h2
          style={style}
          className={mergeClassName(
            color,
            'circular text-2xl font-bold',
            className
          )}
        >
          {children}
        </h2>
      );
      break;
    case 'h3':
      template = (
        <h3
          style={style}
          className={mergeClassName(
            color,
            'circular text-xl font-bold',
            className
          )}
        >
          {children}
        </h3>
      );
      break;
    case 'h4':
      template = (
        <h4
          style={style}
          className={mergeClassName(
            color,
            'circular text-lg font-bold',
            className
          )}
        >
          {children}
        </h4>
      );
      break;
    case 'h5':
      template = (
        <h5
          style={style}
          className={mergeClassName(color, 'circular text-base', className)}
        >
          {children}
        </h5>
      );
      break;
    case 'h6':
      template = (
        <h6
          style={style}
          className={mergeClassName(color, 'circular text-sm', className)}
        >
          {children}
        </h6>
      );
      break;
    case 'p':
      template = (
        <p
          style={style}
          className={mergeClassName(color, 'circular text-sx', className)}
        >
          {children}
        </p>
      );
      break;
    case 'nav':
      template = (
        <span
          style={style}
          className={mergeClassName(color, 'circular text-base', className)}
        >
          {children}
        </span>
      );
      break;
    case 'bread':
    case 'sm':
      template = (
        <span
          style={style}
          className={mergeClassName(
            color,
            'circular text-sm font-normal',
            className
          )}
        >
          {children}
        </span>
      );
      break;
    case 'btn':
      template = (
        <span
          style={style}
          className={mergeClassName(
            color,
            'circular text-base font-semibold',
            className
          )}
        >
          {children}
        </span>
      );
      break;

    default:
      template = (
        <p
          style={style}
          className={mergeClassName(
            color,
            'circular text-base font-normal',
            className
          )}
        >
          {children}
        </p>
      );
      break;
  }

  return <>{template}</>;
}

export default Title;
