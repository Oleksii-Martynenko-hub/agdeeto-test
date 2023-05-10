import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import store from '@/store';

import PageNotFound from '@/containers/PageNotFound';
import CreateLocation from '@/containers/CreateLocation';
import LinkLocation from '@/containers/LinkLocation';
import Location from '@/containers/Location';
import LocationList from './LocationList';
import Auth from './Auth';

export enum PATH {
  ROOT = '/',
  AUTH = '/auth/',
  LOCATION = '/location/',
  LOCATION_LIST = '/location-list/',
  CREATE = '/location/create',
  LINK = '/location/link',
  ID = '/location/:id'
}

const GlobalStyle = createGlobalStyle`
  ${normalize};

  * {
    outline: none;
    box-sizing: border-box;
  }
`;

export const theme = {
  palette: {
    dark: '#303030',
    red: '#e93f3f',
    blue: '#5F63F2',
    green: '#20C997',
    body: '#ecf0f1',
  },
  breakpoints: {
    sm: 360,
    md: 768,
    lg: 1000,
  },
};

const AppStyled = styled.div`
  font-family: 'Inter', sans-serif;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-size: 18px;
  padding: 10px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100%;
  display: flex;
  flex-flow: column;
  background: #F4F5F7;
  color: #272B41;
  font-size: 14px;
`;

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppStyled>
          <GlobalStyle />

          <Switch>
            <Redirect path={PATH.ROOT} to={PATH.CREATE} exact />
            <Route path={PATH.AUTH} component={Auth} exact />
            <Route path={PATH.CREATE} component={CreateLocation} exact />
            <Route path={PATH.LINK} component={LinkLocation} exact />
            <Route path={PATH.ID} component={Location} exact />
            <Route path={PATH.LOCATION_LIST} component={LocationList} exact />
            <Route component={PageNotFound} />
          </Switch>
        </AppStyled>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

export default App;
