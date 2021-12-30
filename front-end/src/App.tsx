import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from './hooks';
import { Routers } from './routes';

import GlobalStyle from './style/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider >
      <Routers />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
