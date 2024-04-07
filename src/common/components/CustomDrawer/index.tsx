import React from 'react';
import { Drawer, theme } from 'antd';
import { Close } from '../icons';
import Title from '../Title';

const { useToken } = theme;

type Props = {
  onClose?: (
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> //eslint-disable-line
  ) => void;
  open?: boolean;
  children: React.ReactNode;
  title: string | React.ReactNode;
  subtitle: string;
  titleIcon?: React.ReactNode;
  destroyOnClose?: boolean;
  width?: number;
};

function CustomDrawer({
  onClose,
  open,
  children,
  subtitle,
  title,
  width,
  titleIcon,
  destroyOnClose,
}: Props) {
  const { token } = useToken();
  return (
    <Drawer
      closeIcon={
        <span
          style={{
            background: token.colorFillTertiary,
            color: token.colorTextLabel,
          }}
        >
          <Close />
        </span>
      }
      width={width}
      onClose={onClose}
      destroyOnClose={destroyOnClose}
      open={open}
      classNames={{
        header: '!border-none !p-2.5 !pb-0',
        body: '!pt-2.5',
      }}
      title={
        <>
          <Title tag="h2" className="inline-flex items-center gap-x-2.5">
            {titleIcon}
            <span>{title}</span>
          </Title>
          <Title
            style={{
              marginBottom: '1rem',
              lineHeight: 1,
              color: token.colorTextSecondary,
            }}
          >
            <span className="text-base font-medium">{subtitle}</span>
          </Title>
        </>
      }
    >
      {children}
    </Drawer>
  );
}

export default CustomDrawer;
