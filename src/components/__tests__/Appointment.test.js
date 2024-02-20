import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment";

afterEach(cleanup);


test('should ', () => {
  const { getByText } = render(<Appointment />);
})

