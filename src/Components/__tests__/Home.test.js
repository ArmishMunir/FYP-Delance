import Home from "../Home";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';

describe("Test the home screen", () => {
    test("home screen description visible", () => {
        render(<Home />, {wrapper: MemoryRouter});
        const description = screen.getByText("Delance"); // initially got it passed using getByTestId and thus allocating a data-testid to the h1 tag
        // console.log("1111111111" + description.textContent + "111111111")
        expect(description.textContent).toMatch("Delance");
    })
})