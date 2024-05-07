import { ButtonProps } from 'antd/es/button';
import { TooltipProps } from 'antd/es/tooltip';

type ClassName = 'container' | 'button' | 'icon';
type ExtraBorder = 'borderLeft' | 'borderRight' | 'borderTop' | 'borderBottom';

type BaseProps = ButtonProps & Partial<Record<ExtraBorder, boolean>>;

export interface CustomButtonProps extends Omit<BaseProps, 'className'> {
  description?: string;
  descriptionPlacement?: TooltipProps['placement'];
  className?: string | Partial<Record<ClassName, string>>;
}
