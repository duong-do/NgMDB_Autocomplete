
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { AppService } from './app.service';
import { CompleterService, CompleterData, LocalData, RemoteData } from 'ng-mdb-pro/pro/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private countries: any;
  private today: Date;
  private maxBirthDateStr: string;
  private netherlandText: string;
  private selectedCountryName: string;

  private birthDate: Date;
  private countryDS: CompleterData;

  constructor(
    private completerService: CompleterService,
    private appService: AppService) {
    
  }
  ngOnInit() {
    this.today = new Date(1989, 12, 10);
    this.birthDate = new Date(1989, 0, 12);
    let datePipe = new DatePipe("en-US");
    this.maxBirthDateStr = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.appService.getCountries().subscribe(data => this.fillCountryDS(data), error => console.log("Error :: " + error));
  }

  fillCountryDS(data) {
    this.countries = data;
    this.countryDS = this.completerService.local(data, 'name,code', 'name');
    this.netherlandText = this.selectedCountryName = this.countries.filter(c => c.code === "NL")[0].name;
  }

  onTextChangeCountry() {
  }

  onSelectChangeCountry(evnt: any) {
  }
}
