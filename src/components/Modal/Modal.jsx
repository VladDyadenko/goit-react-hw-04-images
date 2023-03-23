import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Container, ImgModal, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, currentImag, currentImageDescription }) => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });

    window.addEventListener('click', e => {
      if (e.target.nodeName !== 'IMG') {
        onClose();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });

    window.addEventListener('click', e => {
      if (e.target.nodeName !== 'IMG') {
        onClose();
      }
    });
  }, [onClose]);

  return createPortal(
    <Overlay>
      <Container>
        <ImgModal src={currentImag} alt={currentImageDescription} />
      </Container>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImag: PropTypes.string.isRequired,
  currentImageDescription: PropTypes.string.isRequired,
};
