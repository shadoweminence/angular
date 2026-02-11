// ============================================================================
// AUTH API SERVICE - HTTP client for authentication endpoints
// React equivalent: API utility functions with axios or fetch
// ============================================================================

import { inject, Injectable } from '@angular/core';
import { API_URL } from '@app/app.config';
import { HttpClient } from '@angular/common/http'; // React: axios or fetch

// Type definitions for API requests/responses
// React: Same, TypeScript types or PropTypes
export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// @Injectable: Makes this class available for dependency injection
// providedIn: 'root' means it's a singleton across the app
// React equivalent: Just export functions or create a class instance
//   export const authApi = {
//     login: (request) => axios.post(`${API_URL}/auth/login`, request),
//     register: (request) => axios.post(`${API_URL}/users`, request)
//   };
@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  // inject(): Get dependencies from Angular's DI container
  // React equivalent: import directly or use Context
  //   const API_URL = process.env.REACT_APP_API_URL;
  private readonly baseApiUrl = inject(API_URL);

  // HttpClient: Angular's HTTP service (returns Observables)
  // React equivalent: axios (returns Promises)
  //   import axios from 'axios';
  private readonly http = inject(HttpClient);

  // Login method - returns Observable<LoginResponse>
  // React equivalent:
  //   login: async (request) => {
  //     const response = await axios.post(`${API_URL}/auth/login`, request);
  //     return response.data;
  //   }
  login(request: LoginRequest) {
    const url = `${this.baseApiUrl}/auth/login`;
    // Returns Observable (RxJS) - needs to be subscribed or piped
    // React: Returns Promise - use await or .then()
    return this.http.post<LoginResponse>(url, request);
  }

  // Register method
  // React equivalent:
  //   register: async (request) => {
  //     const response = await axios.post(`${API_URL}/users`, request);
  //     return response.data;
  //   }
  register(request: RegisterRequest) {
    const url = `${this.baseApiUrl}/users`;
    return this.http.post<RegisterRequest>(url, request);
  }
}
