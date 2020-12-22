//@ts-check
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import {take} from 'rxjs/operators';
import { DataService } from './data.service';

export interface Check {
  group: string;
  name: string;
  age: number;
  isChecked?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public groups: {[key: string]: Array<Check>} = {};
  public groupSelectAll: {[key: string]: boolean} = {};
  public myArr: Array<Check>;

  constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.dataService.getData()
      .pipe(
        take(1)
      )
      .subscribe((res: Array<Check>) => {
        this.myArr = res;
        this.addChecked();
      });
  }

  // toggle all checkboxes in a group
  public toggleAllSelected(group: string): void {
    this.groupSelectAll[group] = !this.groupSelectAll[group];

    this.groups[group].forEach((el, i) => {
      this.groups[group][i]['isChecked'] = this.groupSelectAll[group];
    });
  }

  // toggle individual checkboxes
  public toggleCheckboxSelected(index: number, group: string): void {
    this.groups[group][index].isChecked = !this.groups[group][index].isChecked;

    this.groupSelectAll[group] = this.checkIfAllSelected(group);
  }

  // PRIVATE FUNCTIONS

  // add checked to object. Create hash maps
  private addChecked(): void {
    this.myArr.forEach((el, i) => {
      this.myArr[i]['isChecked'] = false;

      // hashmap for selectAll for each group
      this.groupSelectAll[el.group] = false;

      // hashmap for seperating into groups
      if (this.groups[el.group]) {
        this.groups[el.group].push(el);
      } else {
        this.groups[el.group] = [el];
      }
    });
  }

  // check if all checkboxes in a group are selected
  private checkIfAllSelected(group: string): boolean {
    for (let el of this.groups[group]) {
      if (!el.isChecked) {
        return false;
      }
    }
    return true;
  }

}
