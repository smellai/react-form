# React Form Validation using [ValidityState object](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Usage

Declare validation constraint using builtin [input tag](https://www.w3schools.com/tags/tag_input.asp) attributes like:

- required
- pattern
- min
- max

Violations of the declared attributes will be reflected in the [ValidityState object](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)

```Javascript
import { Input } from "./components/input";

<Input
    id="name"
    name="name"
    inputLabel="Name*"
    required
    maxLength="45"
    errorLabel="Name is required"
/>
```

For multiple error messages use **errorLabels** instead of single **errorLabel**. errorLabels keys must match the [ValidityState object](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) ones.

```Javascript
import { Input } from "./components/input";

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
/>
```

To trigger validation on external conditions (e.g. on form submit), set propagatedTouch prop to `true` 

```Javascript
import React, { useRef, useState } from 'react';
import { Input } from "./components/input";

export const FormComponent = () => {
    const [formTouched, setFormTouched] = useState(false);
    const formElement = useRef(null);
    
    const handleSubmit = (event) => {
          setFormTouched(true);
          event.preventDefault();
          
          if (formElement.current.reportValidity()) {
            alert('all good!');
          }
      };
    
    <form onSubmit={handleSubmit}
          ref={formElement}
          noValidate={true}>
        <Input
            type="email"
            id="email"
            name="email"
            inputLabel="Email*"
            required
            errorLabel="You must enter a valid email address"
            propagatedTouch={formTouched}
        />
        <button type="submit">
            Submit
        </button>
    </form>
}
```