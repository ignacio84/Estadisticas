import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const ENV = environment;
const API_NAME = ENV.API_NAME;
const API_KEY = ENV.API_KEY;
const URL_EST = `${ENV.API_URL}/est`;

@Injectable({
  providedIn: 'root'
})
export class EstService {

  constructor(private http: HttpClient) { }

  public insert(est: any): Observable<any> {
    const headers = new HttpHeaders({
      [API_NAME]: API_KEY,
    });
    return this.http.post(URL_EST, est,{headers});
  }
}
