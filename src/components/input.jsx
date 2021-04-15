import React from 'react';
import PropTypes from 'prop-types';

import useFormInput from '../hooks/useFormInput';

import "./input.css";

export const Input = ({
    inputLabel,
    errorLabel,
    errorLabels,
    id,
    value,
    propagatedTouch,
    ...props
}) => {
    const { className, ...args } = props;
    let alternativeErrorMsg = null;

    const {
        inputValue,
        inputErrors,
        inputTouched,
        handleInputBlur,
        handleInputInvalid,
        handleInputChange,
    } = useFormInput();

    const inputContainerClasses = inputErrors.valid === false && (inputTouched || propagatedTouch)
        ? 'demo-input error'
        : 'demo-input';

    for (const property in errorLabels) {
        if (inputErrors[property]) {
            alternativeErrorMsg = errorLabels[property];
        }
    }

    return (
        <div className={[inputContainerClasses, className].join(' ').trim()}>
            <label className="input-label" htmlFor={id}>
                {inputLabel}
            </label>

            <input
                id={id}
                {...args}
                onChange={handleInputChange}
                value={inputValue === null ? value : inputValue}
                onBlur={handleInputBlur}
                onInvalid={handleInputInvalid}
            ></input>

            <span className="error-label">
                {alternativeErrorMsg ||
                    (inputErrors.valid === false && errorLabel)}
            </span>
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    inputLabel: PropTypes.string.isRequired,
    errorLabel: PropTypes.string,
    errorLabels: PropTypes.object,
    id: PropTypes.string.isRequired,
    propagatedTouch: PropTypes.bool,
};

Input.defaultProps = {
    type: 'text',
    value: '',
};
