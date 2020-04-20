import { addDecorator } from '@storybook/react';
import { withThemeProvider, withMemoryRouter } from './decorators';


addDecorator(withThemeProvider);
addDecorator(withMemoryRouter);
