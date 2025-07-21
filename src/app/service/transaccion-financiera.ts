import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Transaccion = {
  id: number;
  tipo: string;
  descripcion: string;
  monto: number;
  fecha: string; 
}

@Injectable({
  providedIn: 'root'
})
export class TransaccionFinanciera {

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/transaccion-financiera';

  getAll(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.baseUrl);
  }

  getById(id: number): Observable<Transaccion> {
    return this.http.get<Transaccion>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Transaccion, 'id'>): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.baseUrl, data);
  }

  update(data: Transaccion): Observable<Transaccion> {
    return this.http.put<Transaccion>(this.baseUrl, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
