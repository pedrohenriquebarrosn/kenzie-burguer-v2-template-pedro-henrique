import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    list-style: none;
    text-decoration: none;
  }

  html, body, #root {
    min-height: 100%;
  }

  body, button, input, select, textarea {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  body {
    color: #28382e;
    background: #f8faf9;
  }

  button { cursor: pointer; }

  dialog { display: unset; position: unset; }
`;
