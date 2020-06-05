import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiUrl = 'https://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=1f1aaba5-616a-4a33-867d-878142cac5c4';

  constructor(
    private http: HttpClient
  ) { }

  getWeatherData() {
    const url = this.apiUrl;
    return this.http.get<any>(url);
  }
}
