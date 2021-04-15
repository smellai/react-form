import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { Input } from "./components/input";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
  });
});

describe("set name value", () => {
    test("checks for name not null", async () => {
      const nameInput = render(
        <Input
          type="text"
          id="name"
          name="name"
          inputLabel="Name*"
          required
          errorLabel="Name is required"
        />
      );
      
      const input = nameInput.getByLabelText("Name*");
      userEvent.type(input, "");
      userEvent.tab(); // focus out
      expect(
        await screen.findByText("Name is required")
      ).toBeInTheDocument();
  
      userEvent.type(input, "Stefania");
      expect(
        screen.queryByText("Name is required")
      ).toBeNull();  
    });
  });

describe("set email value", () => {
  test("checks for email validity", async () => {
    const emailInput = render(
      <Input
        type="email"
        id="email"
        name="email"
        inputLabel="Email*"
        required
        errorLabel="You must enter a valid email address"
      />
    );
    const input = emailInput.getByLabelText("Email*");
    userEvent.type(input, "lalalalala");
    expect(
      await screen.findByText("You must enter a valid email address")
    ).toBeInTheDocument();

    userEvent.clear(input);
    userEvent.tab(); // focus out
    expect(
      await screen.findByText("You must enter a valid email address")
    ).toBeInTheDocument();

    userEvent.type(input, "email@email.com");
    expect(
      screen.queryByText("You must enter a valid email address")
    ).toBeNull();
  });
});

describe("set country code value", () => {
  test("checks for country code validity", async () => {
    const ccInput = render(
      <Input
        type="text"
        id="country_code"
        name="country_code"
        inputLabel="2-letter country code*"
        pattern="[A-Za-z]{2}"
        required
        errorLabel="Country code must be 2-letter"
      />
    );
    const input = ccInput.getByLabelText("2-letter country code*");
    fireEvent.change(input, { target: { value: 'a' } });
    expect(
      await screen.findByText("Country code must be 2-letter")
    ).toBeInTheDocument();
  });
});
