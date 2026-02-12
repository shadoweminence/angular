// ============================================================================
// AUTH API SERVICE - HTTP client for authentication endpoints
// React equivalent: API utility functions with axios or fetch
// ============================================================================

import { inject, Injectable } from '@angular/core';
import { API_URL } from '@app/shared/tokens/api-token';
import { HttpClient } from '@angular/common/http'; // React: axios or fetch
import { ProductResponse } from './productApi';

// Type definitions for API requests/responses
// React: Same, TypeScript types or PropTypes

export type CartRequest = {
  id: number;
  userId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
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
export class CartApi {
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
  getCart() {
    const url = `${this.baseApiUrl}/carts`;
    // Returns Observable (RxJS) - needs to be subscribed or piped
    // React: Returns Promise - use await or .then()
    return this.http.get<CartRequest[]>(url);
  }

  addCart(request: CartRequest) {
    const url = `${this.baseApiUrl}/carts`;
    // Returns Observable (RxJS) - needs to be subscribed or piped
    // React: Returns Promise - use await or .then()
    return this.http.post<CartRequest>(url, request);
  }
}
