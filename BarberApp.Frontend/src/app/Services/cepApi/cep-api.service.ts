import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_BASEURL = 'https://viacep.com.br/ws/{cep}/json/'

@Injectable({
  providedIn: 'root'
})
export class CepApiService {

  constructor(private httpClient: HttpClient) { }

  getAdressByCep(cep: string): Observable<any> {
    return this.httpClient.get(API_BASEURL.replace('{cep}', cep), { params: { 'HideLoader': 'true' } });
  }
}
