import JobForm from "../JobForm";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

// a major drawback is in React is that we cannot unit test functions living inside a functional component


describe("Test Job Form", () => {

    test("duration type is a number", () => {
        render(<JobForm />, {wrapper: MemoryRouter});
        const duration = screen.getByPlaceholderText("Months");
        expect(duration).toHaveAttribute("type", "number");
    });

    test("price type is a float", () => {
        render(<JobForm />, {wrapper: MemoryRouter});
        const price = screen.getByPlaceholderText("0.0");
        expect(price).toHaveAttribute("type", "float");
    });

    // THIS TEST SHOULD WORK IN THE ACTUAL APP HAVING THE BACKEND ATTACHED
    // test("should be able to submit the form", () => {
    //     render(<JobForm />, {wrapper: MemoryRouter});
    //     const projectTitle = screen.getByPlaceholderText("Enter project title");
    //     const timeDuration = screen.getByPlaceholderText("Months");
    //     const price = screen.getByPlaceholderText("0.0");
    //     const techArr = screen.getAllByPlaceholderText("Enter to add..");
    //     const description = screen.getByPlaceholderText("Job description...");
    //     const btn = screen.getByRole("button");

    //     userEvent.type(projectTitle, "Marketing Lead");
    //     userEvent.type(timeDuration, 3);
    //     userEvent.type(price, 10);
    //     userEvent.type(techArr[0], "marketing");
    //     userEvent.type(description, "We need a marketing expert having 5+ years of experience");
    //     userEvent.click(btn);

    //     const success = screen.getByText("Project Added!");
    //     expect(success).toBeInTheDocument();
    // });

    test("post button should not be enabled due to missing values", () => {
        render(<JobForm />, {wrapper: MemoryRouter});
        const projectTitle = screen.getByPlaceholderText("Enter project title"); //placeholder is missing in the jsx file
        const timeDuration = screen.getByPlaceholderText("Months");
        const price = screen.getByPlaceholderText("0.0");
        const techArr = screen.getAllByPlaceholderText("Enter to add..");
        const description = screen.getByPlaceholderText("Job description...");

        userEvent.type(projectTitle, "");
        userEvent.type(timeDuration, "3");
        userEvent.type(price, "10");
        userEvent.type(techArr[0], "");
        userEvent.type(description, "");

        expect(screen.getByText("Post").closest("button")).toHaveAttribute('disabled');
    });
})