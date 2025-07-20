import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type DiarioCaja = {
  id: number;
  fecha: string;
};

@Injectable({
  providedIn: 'root'
})
export class DiariosCaja {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/diarios-caja';

  getAll(): Observable<DiarioCaja[]> {
    return this.http.get<DiarioCaja[]>(this.baseUrl);
  }

  getById(id: number): Observable<DiarioCaja> {
    return this.http.get<DiarioCaja>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<DiarioCaja, 'id'>): Observable<DiarioCaja> {
    return this.http.post<DiarioCaja>(this.baseUrl, data);
  }

  update(id: number, data: Omit<DiarioCaja, 'id'>): Observable<DiarioCaja> {
    return this.http.put<DiarioCaja>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
