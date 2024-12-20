import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #fafafa;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* Modern scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #FF6B6B 0%, #4ECDC4 100%);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #FF5555 0%, #3DBDB4 100%);
  }
`; 