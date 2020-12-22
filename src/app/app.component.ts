//@ts-check
import { Component } from '@angular/core';

interface Check {
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
export class AppComponent {

  public groups: {[key: string]: Array<Check>} = {};
  public groupSelectAll: {[key: string]: boolean} = {};

  public myArr: Array<Check> = [
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
  ]

  ngOnInit(): void {
    this.addChecked();
  }

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

    console.log(this.groupSelectAll);
    
  }

  public toggleCheckboxSelected(index: number, group: string): void {
    this.groups[group][index].isChecked = !this.groups[group][index].isChecked;

    this.groupSelectAll[group] = this.checkIfAllSelected(group);
  }

  public toggleAllSelected(group: string): void {
    this.groupSelectAll[group] = !this.groupSelectAll[group];

    this.groups[group].forEach((el, i) => {
      this.groups[group][i]['isChecked'] = this.groupSelectAll[group];
    });
  }

  private checkIfAllSelected(group: string): boolean {
    for (let el of this.groups[group]) {
      if (!el.isChecked) {
        return false;
      }
    }
    return true;
  }

}
