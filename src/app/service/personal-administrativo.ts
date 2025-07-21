import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Personal = {
  id: number;
  nombres: string;
  apellidos: string;
  cargo: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonalAdministrativo {

  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/personal-administrativo';
  
  getAll(): Observable<PersonalAdministrativo[]> {
    return this.http.get<PersonalAdministrativo[]>(this.baseUrl);
  }

  getById(id: number): Observable<PersonalAdministrativo> {
    return this.http.get<PersonalAdministrativo>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<PersonalAdministrativo, 'id'>): Observable<PersonalAdministrativo> {
    return this.http.post<PersonalAdministrativo>(this.baseUrl, data);
  }

  update(data: PersonalAdministrativo): Observable<PersonalAdministrativo> {
    return this.http.put<PersonalAdministrativo>(this.baseUrl, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
