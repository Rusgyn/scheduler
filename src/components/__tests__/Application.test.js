import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

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
