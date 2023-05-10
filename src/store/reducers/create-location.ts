import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface ICreateLocation {
  address: string;
  description: string;
  images: string[];
  coordinates: ICoordinates;
}

export interface ImageI {
  id: string;
  name: string;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface CreateLocationState {
  isRejected: boolean;
  isRejectedImage: boolean;
  isLoading: boolean;
  isLoadingImage: boolean;
  imagesWithName: ImageI[];
  location: ICreateLocation;
}

const initialState: CreateLocationState = {
  isRejected: false,
  isRejectedImage: false,
  isLoading: false,
  isLoadingImage: false,
  imagesWithName: [],
  location: {
    address: '',
    description: '',
    images: [],
    coordinates: {
      lat: 49,
      lng: 32,
    },
  },
};

export class CreateLocationReducer extends ImmerReducer<CreateLocationState> {
  setAddress(address: string) {
    this.draftState.location.address = address;
  }

  setDescription(description: string) {
    this.draftState.location.description = description;
  }

  setCoordinates(coordinates: ICoordinates) {
    this.draftState.location.coordinates = coordinates;
  }

  addImage(image: ImageI) {
    this.draftState.location.images.push(image.id);
    this.draftState.imagesWithName.push(image);
  }

  deleteImage(imageID: string) {
    this.draftState.location.images = this.draftState.location.images.filter(
      (image) => (image !== imageID),
    );
    this.draftState.imagesWithName = this.draftState.imagesWithName.filter(
      (image) => (image.id !== imageID),
    );
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setIsLoadingImage(isLoadingImage: boolean) {
    this.draftState.isLoadingImage = isLoadingImage;
  }

  setIsRejected(isRejected: boolean) {
    this.draftState.isRejected = isRejected;
  }

  setIsRejectedImage(isRejectedImage: boolean) {
    this.draftState.isRejectedImage = isRejectedImage;
  }

  reset() {
    this.draftState = initialState;
  }
}

export default createReducerFunction(CreateLocationReducer, initialState);
