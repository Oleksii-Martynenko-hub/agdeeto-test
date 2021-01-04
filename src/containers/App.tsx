import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import store from '@/store';

import Home from './Home';

const GlobalStyle = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
  }
`;

const App: React.FC = () => {
  store.subscribe(() => {
    localStorage.setItem('appState', JSON.stringify(store.getState()));
  });

  return (
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyle />

        <Switch>
          <Route path="/" component={Home} exact />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
