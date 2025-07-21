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
export class RubroService {   
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/rubro';

  getAll(): Observable<RubroClass[]> {  
    return this.http.get<RubroClass[]>(this.baseUrl);
  }

  getById(id: number): Observable<RubroClass> {
    return this.http.get<RubroClass>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<RubroClass, 'id'>): Observable<RubroClass> {
    return this.http.post<RubroClass>(this.baseUrl, data);
  }

  update(data: RubroClass): Observable<RubroClass> {
    return this.http.put<RubroClass>(this.baseUrl, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
