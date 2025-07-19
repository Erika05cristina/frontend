import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api';

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`);
  }

  post<T>(path: string, data: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${path}`, data);
  }

  put<T>(path: string, data: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${path}`, data);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${path}`);
  }
}
