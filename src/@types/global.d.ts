import { compose } from 'redux';

declare global {
  interface Window {
    NODE_ENV: 'production' | 'development';
    PORT?: string;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
