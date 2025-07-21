import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Periodo = {
  id: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PeriodoLectivo {

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/periodo-lectivo';

  getAll(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.baseUrl);
  }

  getById(id: number): Observable<Periodo> {
    return this.http.get<Periodo>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Periodo, 'id'>): Observable<Periodo> {
    return this.http.post<Periodo>(this.baseUrl, data);
  }

  update(data: Periodo): Observable<Periodo> {
    return this.http.put<Periodo>(`${this.baseUrl}/${data.id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
