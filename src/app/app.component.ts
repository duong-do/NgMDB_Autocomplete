
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { AppService } from './app.service';
import { CompleterService, CompleterData, LocalData } from 'ng-mdb-pro/pro/autocomplete';

import { OrderBy } from 'ngx-orderby-ts';

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

  sortOrder = new Array<any>();

  constructor(
    private completerService: CompleterService,
    private appService: AppService) {
    this.birthDate = new Date();
  }
  ngOnInit() {
    this.today = new Date();
    const datePipe = new DatePipe('en-US');
    this.maxBirthDateStr = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.appService.getCountries().subscribe(data => this.fillCountryDS(data), error => console.log('Error :: ' + error));

    const collection: any[] = [
      {
        id: 1,
        info: {
          name: 'Ryan',
          number: '123-342',
          birthday: '2007-12-09'
        }
      },
      {
        id: 4,
        info: {
          name: 'Justin',
          number: '123-567',
          birthday: '2007-12-09'
        }
      },
      {
        id: 3,
        info: {
          name: 'Luke',
          number: '234-8765',
          birthday: '2007-12-09'
        }
      },
      {
        id: 2,
        info: {
          name: 'Samuel',
          number: '234-3241',
          birthday: '2009-08-14'
        }
      },
      {
        id: 5,
        info: {
          name: 'Zipora',
          number: '435-1234',
          birthday: ''
        }
      }
    ];

    this.sortOrder = OrderBy.sortMultiple(collection, ['info.birthday', '-info.name']);
  }

  sortData(event: Event) {
    const test = '';
  }


  fillCountryDS(data) {
    this.countries = data;
    this.countryDS = this.completerService.local(data, 'name,code', 'name');
    this.netherlandText = this.selectedCountryName = this.countries.filter(c => c.code === 'NL')[0].name;
  }

  onTextChangeCountry() {
  }

  onSelectChangeCountry(evnt: any) {
  }
}
