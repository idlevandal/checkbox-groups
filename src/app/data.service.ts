import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Check } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getData(): Observable<Check[]> {
    return of([
      {group: 'group1', name: 'Dave', age: 53},
      {group: 'group3', name: 'Jane', age: 31},
      {group: 'group1', name: 'Bill', age: 22},
      {group: 'group2', name: 'Graham', age: 53},
      {group: 'group2', name: 'Max', age: 19},
      {group: 'group3', name: 'Joe', age: 22},
      {group: 'group2', name: 'Brian', age: 73},
      {group: 'group1', name: 'Jim', age: 73},
      {group: 'group1', name: 'Zoe', age: 31},
      {group: 'group3', name: 'Zack', age: 73},
      {group: 'group2', name: 'Mary', age: 22},
      {group: 'group2', name: 'Jill', age: 31},
      {group: 'group3', name: 'John', age: 53},
    ])
  }
}
