import React from 'react';
import dynamic from 'next/dynamic';
import { ModalProps } from 'antd/es/modal';
import { mergeClassName } from '@/common/utils';
import CloseCircle from '../icons/CloseCircle';

type OmitProps = 'closeIcon' | 'footer';

const Modal = dynamic(() => import('antd/es/modal'));

export interface CustomModalProps extends Omit<ModalProps, OmitProps> {
  hideCloseIcon?: boolean;
}

function CustomModal({
  width = 320,
  className,
  classNames,
  hideCloseIcon,
  ...props
}: CustomModalProps) {
  return (
    <Modal
      {...props}
      closeIcon={hideCloseIcon ? false : <CloseCircle size={30} />}
      width={width}
      className={mergeClassName('', className)}
      footer={null}
      classNames={{
        ...classNames,
        header: mergeClassName('!py-1', classNames?.header),
      }}
    >
      {props.children}
    </Modal>
  );
}

export default CustomModal;
