import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ParametroGeneral = {
  id: number;
  nombre: string;
  valor: string;
};

@Injectable({
  providedIn: 'root'
})
export class ParametrosGenerales {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/parametros-generales';

  getAll(): Observable<ParametroGeneral[]> {
    return this.http.get<ParametroGeneral[]>(this.baseUrl);
  }

  getById(id: number): Observable<ParametroGeneral> {
    return this.http.get<ParametroGeneral>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<ParametroGeneral, 'id'>): Observable<ParametroGeneral> {
    return this.http.post<ParametroGeneral>(this.baseUrl, data);
  }

  update(id: number, data: Omit<ParametroGeneral, 'id'>): Observable<ParametroGeneral> {
    return this.http.put<ParametroGeneral>(`${this.baseUrl}/${id}`, { id, ...data });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
