import React, { useRef, useState } from 'react';

import "./App.css";

import { Input } from "./components/input";

function App() {
  const [formTouched, setFormTouched] = useState(false);
  const formElement = useRef(null);

  const handleSubmit = (event) => {
      setFormTouched(true);
      event.preventDefault();
      
      if (formElement.current.reportValidity()) {
        alert('all good!');
      }
  };

  return (
    <div className="page">
      <h1>
        React form validation with <a href="https://developer.mozilla.org/en-US/docs/Web/API/ValidityState" target="_blank" rel="noopener noreferrer">ValidityState object</a>
      </h1>
      <form onSubmit={handleSubmit}
                ref={formElement}
                noValidate={true}>
        <Input
          id="name"
          name="name"
          inputLabel="Name*"
          required
          maxLength="45"
          errorLabel="Name is required"
          propagatedTouch={formTouched}
        />
        <Input
          type="email"
          id="email"
          name="email"
          inputLabel="Email*"
          required
          errorLabel="You must enter a valid email address"
          propagatedTouch={formTouched}
        />
        <Input
          type="number"
          id="age"
          name="age"
          inputLabel="Age [18-100]*"
          required
          min="18"
          max="100"
          errorLabels={{
            valueMissing: "Age is required",
            rangeUnderflow: "Please enter a number > 18",
            rangeOverflow: "Please enter a number < 100",
          }}
          propagatedTouch={formTouched}
        />
        <Input
          type="text"
          id="country_code"
          name="country_code"
          inputLabel="2-letter country code*"
          pattern="[A-Za-z]{2}"
          required
          errorLabel="Country code must be 2-letter"
          propagatedTouch={formTouched}
        />
        <Input
          type="text"
          id="notes"
          name="notes"
          inputLabel="Notes"
        />

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
