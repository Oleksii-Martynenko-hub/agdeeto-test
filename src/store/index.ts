import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';

import thunk from 'redux-thunk';

import MainApi from '@/api/MainApi';

import loginReducer from '@/store/reducers/login';
import createLocationReducer from '@/store/reducers/create-location';
import locationReducer from '@/store/reducers/location';
import { LoginActions } from '@/store/actions/login';
import { CreateLocationActions } from '@/store/actions/create-location';
import { LocationActions } from './actions/location';

const rootReducer = combineReducers({
  loginReducer,
  createLocationReducer,
  locationReducer,
});

export const api = {
  mainApi: MainApi.getInstance(),
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)));

export type State = ReturnType<typeof rootReducer>;
export type Actions = LoginActions | CreateLocationActions | LocationActions;

export default createStore(rootReducer, enhancer);
