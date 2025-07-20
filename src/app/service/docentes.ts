import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Docente = {
  id: number;
  nombres: string;
  apellidos: string;
  especialidad: string;
};

@Injectable({
  providedIn: 'root'
})
export class Docentes {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/docentes';

  getAll(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.baseUrl);
  }

  getById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Docente, 'id'>): Observable<Docente> {
    return this.http.post<Docente>(this.baseUrl, data);
  }

  update(id: number, data: Omit<Docente, 'id'>): Observable<Docente> {
    return this.http.put<Docente>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
