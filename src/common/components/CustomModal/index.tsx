import React from 'react';
import { Modal, ModalProps } from 'antd';
import { mergeClassName } from '@/common/utils';

function CustomModal({ width = 320, className, ...props }: ModalProps) {
  return (
    <Modal width={width} className={mergeClassName('', className)} {...props}>
      {props.children}
    </Modal>
  );
}

export default CustomModal;
