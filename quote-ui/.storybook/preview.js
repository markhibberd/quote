import { addDecorator } from '@storybook/react';
import { withThemeProvider, withMemoryRouter, withReduxProvider } from './decorators';


addDecorator(withThemeProvider);
addDecorator(withMemoryRouter);
addDecorator(withReduxProvider);
