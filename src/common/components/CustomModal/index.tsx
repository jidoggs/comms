import React from 'react';
import { Modal, ModalProps } from 'antd';
import { CloseCircle } from '../icons';
import { mergeClassName } from '@/common/utils';

type OmitProps = 'closeIcon' | 'footer';

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
