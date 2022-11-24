import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../model/user-model';
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UserService {
  cepInformed: string
  cep: any
  apiUrl = 'http://localhost:3002';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  consultaCEP(cep: string) {

    console.log(cep);

    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        return this.httpClient.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }

  public getUser(id: number) {
    return this.httpClient.get(`${this.apiUrl}/${id}`);

  }

    getAllUser() {
      return this.httpClient.get<UserModel[]>(`${this.apiUrl}/user`);
  }
  //
  public createUser(formData: FormData): Observable<FormData> {
    return this.httpClient.post<FormData>(`${this.apiUrl}/auth/register`, formData);
    this.router.navigate([this.getAllUser()])

  }

  public deleteUser(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/user/${id}`);

  }

  public updateUser(id: number, formData: FormData): Observable<UserModel> {
    return this.httpClient.patch<any>(`${this.apiUrl}/user/${id}`, formData);
  }
}
