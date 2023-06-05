import { ICreateLocation } from '@/store/reducers/create-location';
import { ILocation } from '@/store/reducers/location';

import HttpClient from './HttpClient';

export const API_URL = process.env.REACT_APP_API_URL;

class MainApi extends HttpClient {
  private static classInstance?: MainApi;

  public constructor() {
    super(API_URL);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi();
    }

    return this.classInstance;
  }

  public getLocation = (id: string) => this.instance.get<ILocation>(`/locations/${id}`);

  public createLocation = (location: ICreateLocation) => this.instance.post<ILocation>('/locations', location);

  public uploadImage = (formData: FormData) => this.instance.post<{ id: string }>('/images', formData);
}

export default MainApi;
