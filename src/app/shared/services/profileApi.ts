import { inject, Injectable } from '@angular/core';
import { API_URL } from '@app/shared/tokens/api-token';
import { HttpClient } from '@angular/common/http'; // React: axios or fetch

export type ProfileResponse = {
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: number;
};

@Injectable({
  providedIn: 'root',
})
export class ProfileApi {
  private readonly baseApiUrl = inject(API_URL);
  private readonly http = inject(HttpClient);

  getProfile(id: number) {
    const url = `${this.baseApiUrl}/users/${id}`;
    return this.http.get<ProfileResponse>(url);
  }
}
