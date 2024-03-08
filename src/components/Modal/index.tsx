import React, {ComponentProps} from 'react';
import {CustomModal} from './styles';

type ModalProps = ComponentProps<typeof CustomModal> & {
  modalVisible: boolean;
  callback: () => void;
};

export function Modal({modalVisible, callback, children, ...rest}: ModalProps) {
  return (
    <CustomModal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={callback}
      {...rest}>
      {children}
    </CustomModal>
  );
}
