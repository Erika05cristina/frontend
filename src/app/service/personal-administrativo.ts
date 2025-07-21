import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Personal = {
  id: number;
  nombres: string;
  apellidos: string;
  cargo: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonalAdministrativo {

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/personal-administrativo';
  
  getAll(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.baseUrl);
  }

  getById(id: number): Observable<Personal> {
    return this.http.get<Personal>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Personal, 'id'>): Observable<Personal> {
    return this.http.post<Personal>(this.baseUrl, data);
  }

  update(data: Personal): Observable<Personal> {
    return this.http.put<Personal>(this.baseUrl, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
