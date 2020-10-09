import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCharData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/budget');
  }
}
