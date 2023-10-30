import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = 'http://localhost:8080/categoria'

  constructor(private http: HttpClient) { }

  getAll() : Observable <any> {
    return this.http.get(this.url)
  }

save(c : Categoria) : Observable <any> {
  return this.http.post(this.url,c)
}

delete(id : number) : Observable <any> {
  return this.http.post(this.url+'/'+id+'/delete',null)
}

update(c: Categoria) : Observable <any> {
  return this.http.post(this.url+'/'+c.id+'/update',c)
}

cambiarestado(id : number) : Observable <any> {
  return this.http.post(this.url+'/'+id+'/cambiarestado',null)
}

}
