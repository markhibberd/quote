import React from "react"
import { MemoryRouter } from 'react-router';
import { ThemeProvider, theme } from "../src/theme";

const withThemeProvider = (story) => (
  <ThemeProvider theme={theme}>{story()}</ThemeProvider>
)

const withMemoryRouter = (story) => (
  <MemoryRouter>{story()}</MemoryRouter>
);

export { withThemeProvider, withMemoryRouter };
