import Signup from "../Signup";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

describe("Test the signup component", () => {

    test("render the signup form submit button on the screen", async () => {
        render(<Signup />, { wrapper: MemoryRouter });
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    });

    test("the rendered login anchor tag under the form works", async () => {
        render(<Signup />, {wrapper: MemoryRouter });
        expect(screen.getByText('Log in').closest('a')).toHaveAttribute('href', '/login')
    });

    test("email input field should accept email ", () => {
        render(<Signup />, {wrapper: MemoryRouter });
        const email = screen.getByPlaceholderText("Email");
        userEvent.type(email, "hamzah");
        expect(email.value).not.toMatch("hamzah@gmail.com");
    });

    test("passport input should have type password ", () => {
        render(<Signup />, {wrapper: MemoryRouter });
        const password = screen.getByPlaceholderText("****");
        expect(password).toHaveAttribute("type", "password");
    });
});