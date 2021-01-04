import { createActionCreators } from 'immer-reducer';
import { LoginReducer } from '@/store/reducers/login';
import { AsyncAction } from './common';

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions =
  | ReturnType<typeof loginActions.setIsPending>
  | ReturnType<typeof loginActions.setIsResolved>
  | ReturnType<typeof loginActions.setIsRejected>;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const authRestoreAsync = (): AsyncAction => async (dispatch, getState) => {
  try {
    dispatch(loginActions.setIsPending());

    console.log(getState());

    await sleep(2000);

    dispatch(loginActions.setIsResolved());
  } catch (e) {
    dispatch(loginActions.setIsRejected());
  }
};
