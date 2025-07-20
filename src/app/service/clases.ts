import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ClasePayload = {
  aula: string;
  asignatura: { id: number };
  grupo: { id: number } | null;
  docente: { id: number } | null;
  espacioFisico: { id: number } | null;
};

export type Clase = {
  id: number;
  aula: string;
  grupo: {
    id: number;
    nombre?: string;
  } | null;
  asignatura: {
    id: number;
    nombre: string;
    nivel?: string;
    descripcion?: string;
  };
  docente: {
    id: number;
    nombres?: string;
    apellidos?: string;
  } | null;
  espacioFisico: {
    id: number;
    nombre?: string;
  } | null;
  horarios?: unknown[];
  matriculas?: unknown[];
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

  create(data: ClasePayload): Observable<Clase> {
    return this.http.post<Clase>(this.baseUrl, data);
  }


  update(id: number, data: ClasePayload): Observable<Clase> {
    return this.http.put<Clase>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
