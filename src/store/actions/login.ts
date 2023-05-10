import { createActionCreators } from 'immer-reducer';

import { AsyncAction } from '@/store/actions/common';
import { LoginReducer } from '@/store/reducers/login';

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions =
  | ReturnType<typeof loginActions.setIsPending>
  | ReturnType<typeof loginActions.setIsResolved>
  | ReturnType<typeof loginActions.setIsRejected>
  | ReturnType<typeof loginActions.addToLocationList>;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const authRestoreAsync = (): AsyncAction => async (dispatch, getState) => {
  try {
    dispatch(loginActions.setIsPending());

    const { loginReducer } = getState();
    const { user } = loginReducer;

    // const response = await mainApi.getLocation(user);

    await sleep(2000);

    dispatch(loginActions.setIsResolved());
  } catch (e) {
    dispatch(loginActions.setIsRejected());
  }
};

export const addToLocationListAsync = (id: string): AsyncAction => async (
  dispatch,
  _,
  { mainApi },
) => {
  try {
    dispatch(loginActions.setIsPending());

    const response = await mainApi.getLocation(id);

    dispatch(loginActions.addToLocationList(response));
  } catch (e) {
    dispatch(loginActions.setIsRejected());
  } finally {
    dispatch(loginActions.setIsResolved());
  }
};
