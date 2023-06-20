import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient) { }

  getGender(name: string): Observable<any> {
    return this.http.get(`https://api.genderize.io?name=${name}`);
  }

}
