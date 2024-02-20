import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  act,
  prettyDOM,
  getAllByTestId,
  getAllByAltText,
  getByAltText,
  getByPlaceholderText,
  debugDOM,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    act(() => {
      fireEvent.click(getByText("Tuesday"));
    });
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  it("loads data, books an interview and reduces the spots remaining for the firs day by 1", async () => {
    const { container, debug} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const dayListItem = getAllByTestId (container,'day').find(day => queryByText(day, 'Monday'))
    expect(getByText(dayListItem, "no spots remaining")).toBeInTheDocument();
  });
});
