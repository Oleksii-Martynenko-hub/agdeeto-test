import { createSelector, Selector } from 'reselect';

import { State } from '@/store';

import { CreateLocationState, ICreateLocation } from '@/store/reducers/create-location';

const selectCreateLocation = (state: State) => state.createLocationReducer;

export const selectCreateLocationState: Selector<State, CreateLocationState> = createSelector(
  selectCreateLocation,
  (locationState) => locationState,
);

export const selectCreateLocationValues: Selector<State, ICreateLocation> = createSelector(
  selectCreateLocation,
  ({ location }) => location,
);
