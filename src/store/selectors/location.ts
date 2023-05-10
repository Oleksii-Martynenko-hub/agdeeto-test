import { createSelector, Selector } from 'reselect';

import { State } from '@/store';

import { LocationState, ILocation } from '@/store/reducers/location';

const selectLocation = (state: State) => state.locationReducer;

export const selectLocationState: Selector<State, LocationState> = createSelector(
  selectLocation,
  (locationState) => locationState,
);

export const selectLocationValues: Selector<State, ILocation> = createSelector(
  selectLocation,
  ({ location }) => location,
);

export const selectLocationId: Selector<State, string> = createSelector(
  selectLocationValues,
  ({ _id }) => _id,
);
