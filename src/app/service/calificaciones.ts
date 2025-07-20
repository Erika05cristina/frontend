import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Calificacion = {
  id: number;
  nota: number;
  comentario: string;
  fechaRegistro: string;
};

@Injectable({
  providedIn: 'root'
})
export class Calificaciones {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/calificaciones';

  getAll(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.baseUrl);
  }

  getById(id: number): Observable<Calificacion> {
    return this.http.get<Calificacion>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Calificacion, 'id'>): Observable<Calificacion> {
    return this.http.post<Calificacion>(this.baseUrl, data);
  }

  update(id: number, data: Omit<Calificacion, 'id'>): Observable<Calificacion> {
    return this.http.put<Calificacion>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
