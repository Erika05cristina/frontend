import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Estudiante = {
  id: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  fechaNacimiento: string;
  direccion: string;
  contactoEmergencia: string;
};

@Injectable({
  providedIn: 'root',
})
export class Estudiantes {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/estudiantes';

  getAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl);
  }

  getById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Estudiante, 'id'>): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.baseUrl, data);
  }

  update(id: number, data: Omit<Estudiante, 'id'>): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.baseUrl}/${id}`, { id, ...data });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
