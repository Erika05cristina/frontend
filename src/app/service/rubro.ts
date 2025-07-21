import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type RubroClass = {
  id: number;
  descripcion: string;
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class Rubro {
  
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/rubro';

  getAll(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(this.baseUrl);
  }

  getById(id: number): Observable<Rubro> {
    return this.http.get<Rubro>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Rubro, 'id'>): Observable<Rubro> {
    return this.http.post<Rubro>(this.baseUrl, data);
  }

  update(data: Rubro): Observable<Rubro> {
    return this.http.put<Rubro>(this.baseUrl, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
