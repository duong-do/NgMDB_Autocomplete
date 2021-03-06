
import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData, LocalData, RemoteData } from 'ng-mdb-pro/pro/autocomplete';
import { Class, Student } from './class.model';
import { OrderBy } from 'ngx-orderby-ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  classDS: CompleterData;
  studentDS: CompleterData;
  inputClassName: string;
  inputStudenName: string;
  classes = new Array<Class>();

  sortOrder = new Array<any>();

  constructor(
    private completerService: CompleterService) {
  }

  ngOnInit() {
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
    this.studentDS = this.completerService.local(new Array<Student>(), 'studentName', 'studentName');

    this.orderBy();
  }

  onChangeClass() {
    const tmpClasses = this.classes.filter(ta => ta.className === this.inputClassName);
    this.studentDS.cancel();
    if (tmpClasses.length === 1) {
      this.studentDS = this.completerService.local(tmpClasses[0].students, 'studentName', 'studentName');

      console.log(tmpClasses[0].className);
    } else {
      this.studentDS = this.completerService.local(new Array<Student>(), 'studentName', 'studentName');
      this.studentDS.subscribe();
    }
  }

  orderBy() {
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
}
