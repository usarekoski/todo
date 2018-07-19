import styled, { css, injectGlobal } from 'styled-components';

const _ = injectGlobal`
  body {
    margin: 0;
  }
`;

export const colors = {
  text: '#05052B',
  textInactive: '#363636',
  primary: '#294E80',
  secondary: '#E5E5E5',
};

export const sizes = {
  todoHeight: '50px',
  todoFontSize: '24px',
};

export const typography = {
  fontSizes: {
    // heading
    displayLarge: '32px',
    displayMedium: '26px',
    displaySmall: '20px',
    heading: '18px',
    subheading: '16px',

    // body
    body: '17px',
    caption: '15px',
  },

  fontWeight: {
    extrabold: 900,
    bold: 700,
    semibold: 600,
    normal: 400,
    light: 200,
  },

  fontFamily: {
    main: "'Lato', sans-serif",
  },

  lineHeight: {
    // heading
    displayLarge: '48px',
    displayMedium: '48px',
    displaySmall: '24px',
    heading: '24px',
    subheading: '24px',

    // body
    body: '24px',
    caption: '24px',
  },
};

export const baseStyles = css`
  font-family: ${typography.fontFamily.main};
  color: #222;
`;
