import React from 'react';
import { Modal as MaterialModal } from '@material-ui/core';
import './styles.scss';


const Modal = ({ open, onClose, Component }) => {
	return (
    <MaterialModal
      open={open}
      onClose={onClose}
      className='material-modal'>
      <div className='modal'>
        {Component}
      </div>
    </MaterialModal>
	);
};


export default Modal;
