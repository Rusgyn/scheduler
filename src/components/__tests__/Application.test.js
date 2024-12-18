import React from "react";

import { render, cleanup, fireEvent, prettyDOM, findByText, getAllByTestId, getByPlaceholderText, getByAltText, getByText, queryByText, findByAltText, findByTestId, queryByAltText, waitFor } from "@testing-library/react";

import axios from "axios";
import axiosMock from "__mocks__/axios"
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
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");
    
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
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );
    // const appointment = getAllByTestId(container, "appointment").find((appointment) =>
    //   queryByText(appointment, "Archie Cohen")
    // );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    const addButton = await findByTestId(container, "add-button");
    expect(addButton).toBeInTheDocument();
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    axiosMock.resetFixtures();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
   
    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");
    expect(queryByText(container, "Archie Cohen")).toBeInTheDocument();

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container,"appointment").find((appointment) => queryByText(appointment,"Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
     fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await findByText(appointment, "Lydia Miller-Jones");
        
    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    expect(getByText(day, "1 spot remaining")). toBeInTheDocument();
  });

  /* test number five */
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  /* test number six */
  it("shows the save error when failing to save an appointment", async () => {
    // Reset the fixtures before each test
    axiosMock.resetFixtures();
  
    // Setup your mock to reject the promise when the save function is called
    axiosMock.put.mockRejectedValueOnce(new Error("Could not save appointment."));
  
    // 1. Render the Application
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed
    await findByText(container, "Archie Cohen");
  
    // 3. Click the "Edit" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find((appointment) => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
  
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
  
    // 5. Click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    // 6. Click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));
  
    // 7. Check that the element with the text "Saving..." is displayed
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
  
    // 8. Wait until the element with the text "Could not book appointment." is displayed
    await findByText(appointment, "Could not book appointment.");
  
    // 9. Check that the appointment shows the error message
    expect(getByText(appointment, "Could not book appointment.")).toBeInTheDocument();
  });
  

  /* test number seven */
  it("shows the delete error when failing to delete an existing appointment", async () => {
    // Reset the fixtures before each test
    axiosMock.resetFixtures();
  
    // Mock the axios.delete to reject the promise
    axiosMock.delete.mockRejectedValueOnce(new Error("Could not cancel appointment."));
  
    // 1. Render the Application
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed
    await findByText(container, "Archie Cohen");
  
    // 3. Find the appointment to delete
    const appointment = getAllByTestId(container, "appointment").find((appointment) => queryByText(appointment, "Archie Cohen"));
  
    // 4. Click the "Delete" button on that same appointment
    fireEvent.click(getByAltText(appointment, "Delete"));
  
    // 5. Check that the confirmation message is shown
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  
    // 6. Click the "Confirm" button to proceed with deletion
    fireEvent.click(getByText(appointment, "Confirm"));
  
    // 7. Check that the element with the text "Deleting..." is displayed
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
  
    // 8. Wait until the element with the text "Could not delete appointment." is displayed
    await findByText(appointment, "Could not cancel appointment.");
  
    // 9. Check that the appointment shows the error message
    expect(getByText(appointment, "Could not cancel appointment.")).toBeInTheDocument();
  });

});