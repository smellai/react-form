import { useState } from 'react';

/*
    Leveraging ValidityState object https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
*/

const useFormInput = () => {
    const [inputValue, setInputValue] = useState(null);
    const [inputErrors, setInputErrors] = useState({});
    const [inputTouched, setInputTouched] = useState(false);

    const handleInputBlur = (event) => {
        setInputTouched(true);
        setInputErrors(event.target.validity);
    };

    const handleInputInvalid = (event) => {
        // Disable browser error tooltips
        event.preventDefault();
        setInputErrors(event.target.validity);
    };

    const handleInputChange = (event) => {
        if (event.target.reportValidity()) {
            // clean up errors if validation passes
            setInputErrors(event.target.validity);
        }
        setInputValue(event.target.value);
    };

    return {
        handleInputBlur,
        handleInputInvalid,
        handleInputChange,
        inputValue,
        inputErrors,
        inputTouched,
    };
};

export default useFormInput;
