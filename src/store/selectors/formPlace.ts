import { createSelector, Selector } from 'reselect';
import { State } from '@/store';
import { FormPlaceState, ILatLng, IValues } from '@/store/reducers/formPlace';

const selectFormPlace = (state: State) => state.formPlaceReducer;

export const selectFormPlaceState: Selector<State, FormPlaceState> = createSelector(
  selectFormPlace,
  (loginState) => loginState,
);

export const selectFormPlaceValues: Selector<State, IValues> = createSelector(
  selectFormPlace,
  ({ values }) => values,
);

export const selectFormPlaceValuesAddress: Selector<State, string> = createSelector(
  selectFormPlaceValues,
  ({ address }) => address,
);

export const selectFormPlaceValuesDescription: Selector<State, string> = createSelector(
  selectFormPlaceValues,
  ({ description }) => description,
);

export const selectFormPlaceValuesLatLng: Selector<State, ILatLng> = createSelector(
  selectFormPlaceValues,
  ({ latLng }) => latLng,
);
