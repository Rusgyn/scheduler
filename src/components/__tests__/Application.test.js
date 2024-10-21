import React from "react";
import { render, cleanup, fireEvent, prettyDOM, findByText, getAllByTestId, getByPlaceholderText, getByAltText, getByText, queryByText, findByAltText, findByTestId, queryByAltText, waitFor } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  
  //Option 1: This is raw Promise syntax
  // it("defaults to Monday and changes the schedule when a new day is selected", () => {
  //   const { findByText, getByText, queryByText } = render(<Application />);
  //   //findByText return a promise.
  //   return findByText("Monday")
  //     .then(() => {
  //       fireEvent.click(getByText("Tuesday"));
  //       expect(queryByText("Leopold Silvers")).toBeInTheDocument();
  //     });
  // });

  //Option 2: using latest ECMASCRIPT2017, async/await promise
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { queryByText, getByText,findByText } = render(<Application />);

    await findByText("Monday");

    fireEvent.click(getByText("Tuesday"));
    expect(queryByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
   
    // 1. Render the Application.
    await findByText(container, "Archie Cohen");

    // 2. Wait until the text "Archie Cohen" is displayed.
    const appointments = getAllByTestId(container, "appointment");//Appointment component.index.js. data-testid="appointment". Output: Array.
    const appointment = appointments[0];
    
    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));
  
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();//Saving is the status message, check index.js
    //debug();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await findByText(appointment, "Lydia Miller-Jones");
    
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));//DayListItem component
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    const addButton = await findByTestId(container, "add-button"); // Should work now
    expect(addButton).toBeInTheDocument();
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

});