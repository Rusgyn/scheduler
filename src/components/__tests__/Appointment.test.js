import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {

  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

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
      <Appointment
        id={1} time="12pm"
        interviewers = {interviewers}
        // interviewers={[{ id: 1, name: "Sylvia Palmer" }]} 
      />
    );

    fireEvent.click(getByAltText("Add"));
    expect(getByPlaceholderText("Enter Student Name")).toBeInTheDocument(); 
  });

  // it("can save an interview and show it", () => {
  //   const { getByAltText, getByPlaceholderText, getByText } = render(
  //     <Appointment 
  //       id={1} 
  //       time="12pm" 
  //       interviewers={interviewers} 
  //     />
  //   );

  //   fireEvent.click(getByAltText("Add"));
    
  //   fireEvent.change(getByPlaceholderText("Enter Student Name"), { target: { value: "John Doe" } });
  //   fireEvent.click(getByText("Save"));

  //   // After saving, we assume the appointment shows the student's name
  //   expect(getByText("John Doe")).toBeInTheDocument();
  //   expect(getByText("Interviewer")).toBeInTheDocument();
  //   expect(getByText("Sylvia Palmer")).toBeInTheDocument();
  // });

  it("transitions to EDIT mode when Edit button is clicked", () => {
    const { getByText, getByAltText } = render(
      <Appointment 
        id={1} 
        time="12pm" 
        interviewers={interviewers} 
        interview={{ student: "John Doe", interviewer: { id: 1, name: "Sylvia Palmer" } }} 
      />
    );

    fireEvent.click(getByAltText("Edit"));
    expect(getByText("Save")).toBeInTheDocument(); // Check if the form is rendered
  });

  // it("cancels an interview", () => {
  //   const { getByText, getByAltText } = render(
  //     <Appointment 
  //       id={1} 
  //       time="12pm" 
  //       interviewers={interviewers} 
  //       interview={{ student: "John Doe", interviewer: { id: 1, name: "Sylvia Palmer" } }} 
  //     />
  //   );

  //   fireEvent.click(getByAltText("Delete"));
  //   fireEvent.click(getByText("Confirm"));

  //   // After canceling, check that the appointment is not rendered
  //   expect(getByText("John Doe")).not.toBeInTheDocument();
  // });
});
