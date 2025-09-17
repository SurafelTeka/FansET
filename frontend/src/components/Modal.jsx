import React, { useEffect, useId, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, description, children, footer }) => {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previouslyFocusedElement = document.activeElement;

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    const focusTimer = window.requestAnimationFrame(() => {
      const node = dialogRef.current?.querySelector('[data-autofocus]');
      const target = node || dialogRef.current;

      target?.focus({ preventScroll: true });
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      window.cancelAnimationFrame(focusTimer);
      previouslyFocusedElement?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" role="presentation" onMouseDown={handleBackdropClick}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        ref={dialogRef}
        tabIndex={-1}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
          ×
        </button>

        {title ? (
          <h2 id={titleId} className="modal__title">
            {title}
          </h2>
        ) : null}

        {description ? (
          <p id={descriptionId} className="modal__description">
            {description}
          </p>
        ) : null}

        <div className="modal__body">{children}</div>

        {footer ? <div className="modal__footer">{footer}</div> : null}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node
};

Modal.defaultProps = {
  title: undefined,
  description: undefined,
  footer: undefined
};

export default Modal;
