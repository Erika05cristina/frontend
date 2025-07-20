import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Matricula = {
  id: number;
  fecha: string;
};

@Injectable({
  providedIn: 'root'
})
export class Matriculas {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/matriculas';

  getAll(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.baseUrl);
  }

  getById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Matricula, 'id'>): Observable<Matricula> {
    return this.http.post<Matricula>(this.baseUrl, data);
  }

  update(id: number, data: Omit<Matricula, 'id'>): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.baseUrl}/${id}`, { id, ...data });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
