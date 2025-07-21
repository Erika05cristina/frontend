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

  getAll(): Observable<TransaccionFinanciera[]> {
    return this.http.get<TransaccionFinanciera[]>(this.baseUrl);
  }

  getById(id: number): Observable<TransaccionFinanciera> {
    return this.http.get<TransaccionFinanciera>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<TransaccionFinanciera, 'id'>): Observable<TransaccionFinanciera> {
    return this.http.post<TransaccionFinanciera>(this.baseUrl, data);
  }

  update(data: TransaccionFinanciera): Observable<TransaccionFinanciera> {
    return this.http.put<TransaccionFinanciera>(this.baseUrl, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
