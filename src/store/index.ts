import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import { LoginActions } from './actions/login';
import loginReducer from './reducers/login';

const rootReducer = combineReducers({
  loginReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export type State = ReturnType<typeof rootReducer>;
export type Actions = LoginActions;

const persistedState = localStorage.getItem('appState')
  ? JSON.parse(localStorage.getItem('appState')!) : {};

export default createStore(rootReducer, persistedState, enhancer);
