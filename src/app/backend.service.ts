import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiDatabaseUrl = 'http://localhost:4200/api/weather-info';

  constructor(
    private http: HttpClient
  ) { }

  getBackEndData() {
    const url = this.apiDatabaseUrl;
    return this.http.get<any>(url);
  }
}
