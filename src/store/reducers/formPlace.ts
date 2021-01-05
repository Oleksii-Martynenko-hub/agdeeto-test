import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface IValues {
  address: string;
  description: string;
  latLng: ILatLng;
}
export interface ILatLng {
  lat: number;
  lng: number;
}
export interface FormPlaceState {
  values: IValues;
}

const initialState: FormPlaceState = {
  values: {
    address: '',
    description: '',
    latLng: {
      lat: 50.4501,
      lng: 30.5234,
    },
  },
};

export class FormPlaceReducer extends ImmerReducer<FormPlaceState> {
  setValues(values: IValues) {
    this.draftState.values = values;
  }

  setAddress(address: string) {
    this.draftState.values.address = address;
  }

  setLatLng({ lat, lng }: ILatLng) {
    this.draftState.values.latLng.lat = lat;
    this.draftState.values.latLng.lng = lng;
  }
}

export default createReducerFunction(FormPlaceReducer, initialState);
