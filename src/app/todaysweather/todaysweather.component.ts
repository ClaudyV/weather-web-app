import { Component, OnInit, ViewChild} from '@angular/core';

// Created services
import { WeatherService } from '../weather.service';
import { BackendService } from '../backend.service';

// Imported material
import { MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-todaysweather',
  templateUrl: './todaysweather.component.html',
  styleUrls: ['./todaysweather.component.css']
})
export class TodaysweatherComponent implements OnInit {

  listData: MatTableDataSource<any>; // Stores all the weather data
  displayedColumns = ['_id', 'dataTime', 'measures', 'lon', 'value', 'locationName', 'geocode', 'lat']; // Header of table
  paginatorSize = [5, 10, 25, 50, 100]; // Paginator size
  @ViewChild(MatSort) sort: MatSort; // Sorting
  @ViewChild(MatPaginator) paginator: MatPaginator; // Paginating
  searchKey: string; // Searck input
  backEndData; // Stores backend data

  constructor(private wheaterData: WeatherService,
              private backEndApi: BackendService) { }

  ngOnInit(): void {
    this.todaysData();
    this.apiData();
  }

  // This function gets the weather data and passes the data to dataManage() function
  todaysData(){
    this.wheaterData.getWeatherData().subscribe(
      data =>
        {
          this.dataManage(data);
        }
    );
  }

  // This function gets backend data
  apiData(){
    this.backEndApi.getBackEndData().subscribe(
      data =>
        {
          this.dataManage(data);
        }
    );
  }

  // This function takes the weather data as parameter and stores it to listData
  dataManage(data) {
    const dataLength = data.length;

    if (!dataLength) {
      this.listData = new MatTableDataSource(data.result.results);
      this.sortAndPaginator();
    } else {
      this.listData = new MatTableDataSource(data[dataLength - 1].result.results);
      this.sortAndPaginator();
    }
  }

  // This function performs sort and paginator tasks
  sortAndPaginator() {
    this.listData.sort = this.sort; // Sort feature
    this.listData.paginator = this.paginator; // Paginator feature
  }

  // This function clears the search input as soon as users click on close button
  onSearchClear() {
    this.searchKey = ''; // Empty the user input when you click on close button
    this.applyFilter();
  }

  // This function filters the data that users enter
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
