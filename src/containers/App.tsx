import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import store from '@/store';

import Location from '@/components/Location';
import CreateLocation from '@/components/CreateLocation';
import Home from './Home';

const GlobalStyle = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
  }
`;

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />

      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/createLocation" component={CreateLocation} />
        <Route path="/location/:id_test" component={Location} />
      </Switch>
    </Provider>
  </BrowserRouter>
);

export default App;
