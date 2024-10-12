import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment id={1} time="12pm" interviewers={[]} />);
  });

  it("displays Empty mode when no interview is booked", () => {
    const { getByAltText } = render(<Appointment id={1} time="12pm" interviewers={[]} />);
    const addButton = getByAltText("Add");
    expect(addButton).toBeInTheDocument();
  });

  it("transitions to CREATE mode when Add button is clicked", () => {
    const { getByAltText, getByPlaceholderText } = render(
      <Appointment id={1} time="12pm" interviewers={[{ id: 1, name: "Sylvia Palmer" }]} />
    );

    fireEvent.click(getByAltText("Add"));
    expect(getByPlaceholderText("Enter Student Name")).toBeInTheDocument(); // Check if the form is rendered
  });

  it("transitions to EDIT mode when Edit button is clicked", () => {
    const { getByText, getByAltText } = render(
      <Appointment 
        id={1} 
        time="12pm" 
        interviewers={[{ id: 1, name: "Sylvia Palmer" }]} 
        interview={{ student: "John Doe", interviewer: { id: 1, name: "Sylvia Palmer" } }} 
      />
    );

    fireEvent.click(getByAltText("Edit"));
    expect(getByText("Save")).toBeInTheDocument(); // Check if the form is rendered
  });

});
