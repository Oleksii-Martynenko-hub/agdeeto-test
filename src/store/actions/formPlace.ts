import { createActionCreators } from 'immer-reducer';
import { FormPlaceReducer } from '@/store/reducers/formPlace';
// import { AsyncAction } from './common';

export const formPlaceActions = createActionCreators(FormPlaceReducer);

export type FormPlace =
  | ReturnType<typeof formPlaceActions.setValues>
  | ReturnType<typeof formPlaceActions.setAddress>
  | ReturnType<typeof formPlaceActions.setDescription>
  | ReturnType<typeof formPlaceActions.setLatLng>;

// export const authRestoreAsync = (): AsyncAction => async (dispatch, getState) => {
//   try {
//     dispatch(loginActions.setIsPending());

//     dispatch(loginActions.setIsResolved());
//   } catch (e) {
//     dispatch(loginActions.setIsRejected());
//   }
// };
