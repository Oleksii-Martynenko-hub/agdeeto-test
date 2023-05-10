import { Omit } from 'react-router';
import { createReducerFunction, ImmerReducer } from 'immer-reducer';

import { CreateLocationState, ICreateLocation } from './create-location';

export interface ILocation extends ICreateLocation {
  _id: string;
}

export interface LocationState extends Omit<CreateLocationState, 'imagesWithName' | 'isRejectedImage' | 'isLoadingImage'>{
  location: ILocation;
}

const initialState: LocationState = {
  isRejected: false,
  isLoading: false,
  location: {
    _id: '',
    address: '',
    description: '',
    images: [],
    coordinates: {
      lat: 49,
      lng: 32,
    },
  },
};

export class LocationReducer extends ImmerReducer<LocationState> {
  setLocation(location: ILocation) {
    this.draftState.location = location;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setIsRejected(isRejected: boolean) {
    this.draftState.isRejected = isRejected;
  }

  reset() {
    this.draftState = initialState;
  }
}

export default createReducerFunction(LocationReducer, initialState);
