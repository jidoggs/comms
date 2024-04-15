import { ButtonProps, TooltipProps } from 'antd';

type ClassName = 'container' | 'button' | 'icon';
type ExtraBorder = 'borderLeft' | 'borderRight' | 'borderTop' | 'borderBottom';

type BaseProps = ButtonProps & Partial<Record<ExtraBorder, boolean>>;

export interface CustomButtonProps extends Omit<BaseProps, 'className'> {
  description?: string;
  descriptionPlacement?: TooltipProps['placement'];
  className?: string | Partial<Record<ClassName, string>>;
}
