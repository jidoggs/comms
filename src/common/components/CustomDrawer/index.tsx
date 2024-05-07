import React from 'react';
import dynamic from 'next/dynamic';
import useToken from 'antd/es/theme/useToken';
import Title from '../Title';
import Close from '../icons/Close';

const Drawer = dynamic(() => import('antd/es/drawer'));

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
  const [_, token] = useToken(); //eslint-disable-line
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
