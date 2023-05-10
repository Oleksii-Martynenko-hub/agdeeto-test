import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import { ILocation } from './location';

export interface UserI {
  email: string;
  password: string;
}

export interface LoginState {
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  locationList: ILocation[];
  user: UserI;
}

const initialState: LoginState = {
  isPending: false,
  isResolved: false,
  isRejected: false,
  locationList: [],
  user: {
    email: '',
    password: '',
  },
};

export class LoginReducer extends ImmerReducer<LoginState> {
  setIsPending() {
    this.draftState.isPending = true;
    this.draftState.isResolved = false;
    this.draftState.isRejected = false;
  }

  setIsResolved() {
    this.draftState.isPending = false;
    this.draftState.isResolved = true;
  }

  setIsRejected() {
    this.draftState.isPending = false;
    this.draftState.isRejected = true;
  }

  addToLocationList(location: ILocation) {
    this.draftState.locationList.push(location);
  }

  setEmail(email: string) {
    this.draftState.user.email = email;
  }

  setPassword(password: string) {
    this.draftState.user.password = password;
  }
}

export default createReducerFunction(LoginReducer, initialState);
