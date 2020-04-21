import { ThemeProvider } from 'styled-components';

const theme = {
  font: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    size: {
      default: '12px',
      header: '14px',
      title: '20px',
    },
    weight: {
      default: 400,
      header: 500,
      title: 700,

    },
    height: {
      default: '20px',
      header: '22px',
      title: '28px',
    },
  },
  color: {
    header: '#595959',
    danger: '#F24236',
    primary: '#2E86AB',
    pallete: {
      one: '#454851',
      two: '#2E86AB',
      three: '#94E8B4',
      four: '#FF9505',
      five: '#F24236',
    },
  },
};


export { ThemeProvider, theme };
