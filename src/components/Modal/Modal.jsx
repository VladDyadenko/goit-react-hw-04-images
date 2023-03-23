import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Container, ImgModal, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, currentImag, currentImageDescription }) => {
  useEffect(() => {
    const handleCloseModalEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    const handleCloseModalBackdrop = e => {
      if (e.target.nodeName !== 'IMG') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleCloseModalEsc);
    window.addEventListener('click', handleCloseModalBackdrop);

    return () => {
      window.removeEventListener('keydown', handleCloseModalEsc);
      window.removeEventListener('click', handleCloseModalBackdrop);
    };
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
