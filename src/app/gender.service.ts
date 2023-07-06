import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient) { }


    /**
   * This method is used to check if the given name is male or female.
   * 
   * @param name - String. The name to be genderized.
   * @returns - A JSON object with various information about the name, including the gender.
   */
  getGender(name: string): Observable<any> {
    return this.http.get(`https://api.genderize.io?name=${name}`);
  }
}