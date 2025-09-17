import React from 'react';
import PropTypes from 'prop-types';
import './FormInput.css';

const FormInput = ({ label, hint, children }) => (
  <label className="form-input">
    <span className="form-input__label">{label}</span>
    {children}
    {hint && <small className="form-input__hint">{hint}</small>}
  </label>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  children: PropTypes.node.isRequired
};

FormInput.defaultProps = {
  hint: undefined
};

export default FormInput;
