import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url ='http://localhost:8080/producto'
  constructor(private http: HttpClient) { }

getAll() : Observable <any> {
    return this.http.get(this.url)
}

save(p : Producto) : Observable <any> {
  return this.http.post(this.url,p)
}

delete(id : number) : Observable <any> {
  return this.http.post(this.url+'/'+id+'/delete',null)
}

update(p: Producto) : Observable <any> {
  return this.http.post(this.url+'/'+p.id+'/update',p)
}

cambiarestado(id : number) : Observable <any> {
  return this.http.post(this.url+'/'+id+'/cambiarestado',null)
}

}
