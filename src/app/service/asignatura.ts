import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Asignatura = {
  id: number;
  nombre: string;
  nivel: string;
  descripcion: string;
};

@Injectable({
  providedIn: 'root'
})
export class Asignaturas {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/asignaturas';

  getAll(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.baseUrl);
  }

  getById(id: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Asignatura, 'id'>): Observable<Asignatura> {
    return this.http.post<Asignatura>(this.baseUrl, data);
  }

  update(id: number, data: Omit<Asignatura, 'id'>): Observable<Asignatura> {
    return this.http.put<Asignatura>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
