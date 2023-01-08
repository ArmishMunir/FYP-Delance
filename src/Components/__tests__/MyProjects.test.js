import MyProjects from "../MyProjects";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

describe("Test My Projects component", () => {

    test("checking New Project button is rendered", async () => {
        render(<MyProjects />, {wrapper: MemoryRouter});
        const btnList = await screen.findAllByRole('button');
        
        // console.log(btnList[0].onclick)
        // expect(btnList[0]).toHaveAttribute('onclick', 'Function: noop')
        fireEvent.click(btnList[0]);

        // const newProjectPage = await waitFor(() => screen.getByText("Add a Project!"));
        // expect(newProjectPage).toBeInTheDocument();

        // expect(toPostProject).toHaveBeenCalled();

        expect(btnList[0]).toBeInTheDocument();
    });

    
});