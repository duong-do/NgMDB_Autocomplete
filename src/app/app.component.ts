
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { AppService } from './app.service';
import { CompleterService, CompleterData, LocalData, RemoteData } from 'ng-mdb-pro/pro/autocomplete';
import { Class, Student } from './class.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private countries: any;
  private selectedCountryName: string;

  private countryDS: CompleterData;
  classDS: CompleterData;
  studentDS: CompleterData;
  inputClassName: string;
  inputStudenName: string
  classes = new Array<Class>();

  constructor(
    private completerService: CompleterService,
    private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getCountries().subscribe(data => this.fillCountryDS(data), error => console.log('Error :: ' + error));
    const s1 = new Student(); s1.studentName = 'Student A-1';
    const s2 = new Student(); s2.studentName = 'Student A-2';
    const studentsA = new Array<Student>(); studentsA.push(s1); studentsA.push(s2);
    const classA = new Class(); classA.className = 'Class A'; classA.students = studentsA;

    const s1b = new Student(); s1b.studentName = 'Student B-1';
    const s2b = new Student(); s2b.studentName = 'Student B-2';
    const studentsB = new Array<Student>(); studentsB.push(s1b); studentsB.push(s2b);
    const classB = new Class(); classB.className = 'Class B'; classB.students = studentsB;

    this.classes.push(classA); this.classes.push(classB);

    this.classDS = this.completerService.local(this.classes, 'className', 'className');
  }

  onChangeClass() {
    const tmpClasses = this.classes.filter(ta => ta.className === this.inputClassName);
    if (tmpClasses.length === 1) {
      this.studentDS = this.completerService.local(tmpClasses[0].students, 'studentName', 'studentName');
    }
  }

  



  fillCountryDS(data) {
    this.countries = data;
    this.countryDS = this.completerService.local(data, 'name,code', 'name');
    this.selectedCountryName = this.countries.filter(c => c.code === 'NL')[0].name;
  }

  onTextChangeCountry() {
  }

  onSelectChangeCountry(evnt: any) {
  }
}
