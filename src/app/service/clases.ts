import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Clase = {
  id: number;
  aula: string;
  asignatura: {
    id: number;
    nombre?: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class Clases {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/clases';

  getAll(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.baseUrl);
  }

  getById(id: number): Observable<Clase> {
    return this.http.get<Clase>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Clase, 'id'>): Observable<Clase> {
    return this.http.post<Clase>(this.baseUrl, data);
  }

  update(id: number, data: Omit<Clase, 'id'>): Observable<Clase> {
    return this.http.put<Clase>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
