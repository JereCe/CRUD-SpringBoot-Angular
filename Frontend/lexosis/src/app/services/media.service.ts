import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private url = 'http://localhost:8080/media'

  constructor(
    private http: HttpClient
  ) { }
  uploadFile(formData: FormData): Observable<string> {
    return this.http.post<any>(this.url + '/upload', formData).pipe(
      map((response: any) => {
        
        return response.url;
      })
    );
  }
}
