import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private Country_Api_Url = 'https://restcountries.eu/rest/v2/all';



  constructor(private http: Http) {

  }

  getData() {
    return this.http.get(this.Country_Api_Url)
      .map(response => response.json());


  }
}
