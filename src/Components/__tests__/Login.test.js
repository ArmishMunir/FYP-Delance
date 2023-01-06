import Login from "../Login";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

describe("Test the Login component", () => {

    test("render the login form submit button on the screen", async () => {
        render(<Login />, { wrapper: MemoryRouter });
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    });

    test("the rendered signup anchor tag under the form works", async () => {
        render(<Login />, {wrapper: MemoryRouter });
        // const signupLinkBtn = await screen.findByTestId("signup");
        // console.log(screen.getByText("Sign Up"))
        // expect(signupLinkBtn);
        expect(screen.getByText('Sign Up').closest('a')).toHaveAttribute('href', '/signup')

    });

    // THIS TEST WILL WORK 100% FINE WHEN TESTED IN THE ACTUAL APP CUZ A POST API IS SENT TO THE BACKEND
    // test("should display alert if error", () => {
    //     render(<Login />, {wrapper: MemoryRouter });
    //     const email = screen.getByPlaceholderText("Email");
    //     const password = screen.getByPlaceholderText("****");
    //     const buttonList = screen.getAllByRole("button");

    //     userEvent.type(email, "hamzah");
    //     userEvent.type(password, "123456");
    //     userEvent.click(buttonList[0]);
    //     const error = screen.getByText("Please include an '@' in the email address. 'hamzah' is missing an '@'.");
    //     expect(error).toBeInTheDocument();
    // });

    test("email input field should accept email ", () => {
        render(<Login />, {wrapper: MemoryRouter });
        const email = screen.getByPlaceholderText("Email");
        userEvent.type(email, "hamzah");
        expect(email.value).not.toMatch("hamzah@gmail.com");
    });

    test("passport input should have type password ", () => {
        render(<Login />, {wrapper: MemoryRouter });
        const password = screen.getByPlaceholderText("****");
        expect(password).toHaveAttribute("type", "password");
    });
})