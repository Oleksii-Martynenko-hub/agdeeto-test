import { createActionCreators } from 'immer-reducer';

import { AsyncAction } from '@/store/actions/common';
import { LocationReducer } from '@/store/reducers/location';

export const locationActions = createActionCreators(LocationReducer);

export type LocationActions =
  | ReturnType<typeof locationActions.setLocation>
  | ReturnType<typeof locationActions.setIsLoading>
  | ReturnType<typeof locationActions.setIsRejected>
  | ReturnType<typeof locationActions.reset>;

export const getLocationAsync = (id: string): AsyncAction => async (dispatch, _, { mainApi }) => {
  try {
    dispatch(locationActions.setIsLoading(true));

    const response = await mainApi.getLocation(id);

    dispatch(locationActions.setLocation(response));
  } catch (e) {
    dispatch(locationActions.setIsRejected(true));
  } finally {
    dispatch(locationActions.setIsLoading(false));
  }
};
