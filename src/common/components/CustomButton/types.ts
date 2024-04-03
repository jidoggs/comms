import { ButtonProps, TooltipProps } from 'antd';

type ClassName = 'container' | 'button';
type ExtraBorder = 'borderLeft' | 'borderRight' | 'borderTop' | 'borderBottom';

type BaseProps = ButtonProps & Partial<Record<ExtraBorder, boolean>>;

export interface CustomInputProps extends Omit<BaseProps, 'className'> {
  description?: string;
  descriptionPlacement?: TooltipProps['placement'];
  className?: string | Partial<Record<ClassName, string>>;
}
