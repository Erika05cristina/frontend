import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Grupo = {
  id: number;
  nombre: string;
  modalidad: string;
};

@Injectable({
  providedIn: 'root'
})
export class Grupos {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/grupos';

  getAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.baseUrl);
  }

  getById(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Grupo, 'id'>): Observable<Grupo> {
    return this.http.post<Grupo>(this.baseUrl, data);
  }

  update(id: number, data: Omit<Grupo, 'id'>): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.baseUrl}/${id}`, { id, ...data });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
