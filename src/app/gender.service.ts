import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient) { }

  /**
   * This Methode is used to Check if the given Name is Male or Female.
   * 
   * @param name - String. The Name that should be genderized
   * @returns - Object. Json Object with different Informations about the name - Including the Gender
   */
  getGender(name: string): Observable<any> {
    return this.http.get(`https://api.genderize.io?name=${name}`);
  }

}
