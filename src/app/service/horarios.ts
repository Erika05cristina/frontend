import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Horario = {
  id: number;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
};

@Injectable({
  providedIn: 'root',
})
export class Horarios {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/horarios';

  getAll(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.baseUrl);
  }

  getById(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Horario, 'id'>): Observable<Horario> {
    return this.http.post<Horario>(this.baseUrl, data);
  }

  update(id: number, data: Omit<Horario, 'id'>): Observable<Horario> {
    return this.http.put<Horario>(`${this.baseUrl}/${id}`, { id, ...data });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
