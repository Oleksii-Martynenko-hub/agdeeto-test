import { createActionCreators } from 'immer-reducer';

import { AsyncAction } from '@/store/actions/common';
import { locationActions } from '@/store/actions/location';
import { CreateLocationReducer } from '@/store/reducers/create-location';

export const createLocationActions = createActionCreators(CreateLocationReducer);

export type CreateLocationActions =
  | ReturnType<typeof createLocationActions.setAddress>
  | ReturnType<typeof createLocationActions.setDescription>
  | ReturnType<typeof createLocationActions.setCoordinates>
  | ReturnType<typeof createLocationActions.addImage>
  | ReturnType<typeof createLocationActions.deleteImage>
  | ReturnType<typeof createLocationActions.setIsLoading>
  | ReturnType<typeof createLocationActions.setIsLoadingImage>
  | ReturnType<typeof createLocationActions.setIsRejected>
  | ReturnType<typeof createLocationActions.setIsRejectedImage>
  | ReturnType<typeof createLocationActions.reset>;

export const createLocationAsync = (): AsyncAction => async (dispatch, getState, { mainApi }) => {
  try {
    dispatch(createLocationActions.setIsLoading(true));

    const { createLocationReducer } = getState();
    const { location } = createLocationReducer;

    const response = await mainApi.createLocation(location);

    dispatch(locationActions.setLocation(response));
  } catch (e) {
    dispatch(createLocationActions.setIsRejected(true));
  } finally {
    dispatch(createLocationActions.setIsLoading(false));
  }
};

export const uploadImageAsync = (formData: FormData, name: string): AsyncAction => async (
  dispatch,
  _,
  { mainApi },
) => {
  try {
    dispatch(createLocationActions.setIsLoadingImage(true));

    const { id } = await mainApi.uploadImage(formData);

    dispatch(createLocationActions.addImage({ id, name }));
  } catch (e) {
    dispatch(createLocationActions.setIsRejectedImage(true));
  } finally {
    dispatch(createLocationActions.setIsLoadingImage(false));
  }
};
