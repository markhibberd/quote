import { ThemeProvider } from 'styled-components';

const theme = {
  font: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    size: {
      default: '12px',
      header: '14px',
    },
    weight: {
      default: 400,
      header: 500,

    },
    height: {
      default: '20px',
      header: '22px',
    },
  },
  color: {
    header: '#595959',
  }

};


export { ThemeProvider, theme };
