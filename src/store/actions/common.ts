import { ThunkAction } from 'redux-thunk';

import { State, Actions, api } from '@/store';

export type AsyncAction<R = void> = ThunkAction<R, State, typeof api, Actions>;
