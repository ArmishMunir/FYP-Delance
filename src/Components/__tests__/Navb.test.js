import Navb from "../Navb";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

describe("Test navbar anchor links", () => {
    test("login href works fine", async () => {
        render(<Navb />, {wrapper: MemoryRouter });
        expect(screen.getByText('Log in').closest('a')).toHaveAttribute('href', '/login')
    });
    
    test("signup href works fine", async () => {
        render(<Navb />, {wrapper: MemoryRouter });
        expect(screen.getByText('Sign up').closest('a')).toHaveAttribute('href', '/signup')
    });

    // THE FOLLOWING TEST CASES WILL STAND VALID WHEN THE !login condition STANDS TRUE in Navb.jsx
    // test("add job href works fine", async () => {
    //     render(<Navb />, {wrapper: MemoryRouter });
    //     expect(screen.getByText('Add Job').closest('a')).toHaveAttribute('href', '/job-post')
    // });

    // test("browse jobs href works fine", async () => {
    //     render(<Navb />, {wrapper: MemoryRouter });
    //     expect(screen.getByText('Browse Jobs').closest('a')).toHaveAttribute('href', '/show-jobs')
    // });

    // test("my projects href works fine", async () => {
    //     render(<Navb />, {wrapper: MemoryRouter });
    //     expect(screen.getByText('My Projects').closest('a')).toHaveAttribute('href', '/my-projects')
    // });
});