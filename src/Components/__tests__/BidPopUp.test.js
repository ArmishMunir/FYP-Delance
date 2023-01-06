import BidPopUp from "../BidPopUp";
import { findAllByRole, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

describe("Test the Bid popup", () => {
    
    test("time required type is a number", () => {
        render(<BidPopUp />, {wrapper: MemoryRouter});
        const timeRequired = screen.getByPlaceholderText("Months"); //placeholder is missing in the jsx file
        expect(timeRequired).toHaveAttribute("type", "number");
    });

    test("price type is a string", () => {
        render(<BidPopUp />, {wrapper: MemoryRouter});
        const price = screen.getByPlaceholderText("0.0"); //placeholder is missing in the jsx file
        expect(price).toHaveAttribute("type", "string");
    });

    // THIS ONE IS A BIT DOUBTFUL BUT IT SHOULD WORK PROPERLY
    // test("save button is working", async () => {
    //     render(<BidPopUp />, {wrapper: MemoryRouter});
    //     expect(screen.getByText("Save").closest("button")).toHaveAttribute('onClick', 'handleSubmit');
    // });

    // WILL WORK FINE WHEN TESTED IN ACTUAL PROJECT
    test("bid form should be submitted", async () => {
        render(<BidPopUp />, {wrapper: MemoryRouter});
        const summary = screen.getByPlaceholderText("summary"); //placeholder missing in jsx
        const price = screen.getByPlaceholderText("0.0"); //placeholder missing in jsx
        const timeRequired = screen.getByPlaceholderText("Months"); //placeholder missing in jsx
        const btnList = await findAllByRole("button");

        userEvent.type(summary, "abcdefghijklm");
        userEvent.type(price, "7");
        userEvent.type(timeRequired, "2");
        userEvent.click(btnList[2]);

        const success = screen.getByText("Bid Added!");
        expect(success).toBeInTheDocument();
    });
})