import { Component, Input, OnInit } from '@angular/core';
import { DefaultTable } from './default-table';

@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.css']
})

export class DefaultTableComponent implements OnInit {
  @Input() tableTitle?: string;
  @Input() table?: DefaultTable;
  @Input() searchBar: boolean = true;
  @Input() maxElements: number = 0; // 0 = altura fixa

  searchFocused = false;
  propertiesOfObjects = [''];

  searchFilter: string = '';
  orderedBy: number = 0;

  getFilteredTable(): DefaultTable{
    if (!this.table) {
      return {
        titles: [''],
        objects: []
      }
    }

    const initialTable = this.table;
    const objectProps = this.getObjectProps();

    const filteredObjects = initialTable.objects.filter((obj) => {
        let containsFilterString = false;

        initialTable.titles.forEach((_title, i) => {
          if (!obj.object[objectProps[i]])
            return;
          if (obj.object[objectProps[i]].toString().toLowerCase().includes(this.searchFilter) || !this.searchFilter)
            containsFilterString = true;
        });

        if (containsFilterString)
          return obj;

        return null;
      })
      .sort((n1, n2) => {
        if (this.orderedBy == 0)
          return 0;

        const orderedByTitle = objectProps[Math.abs(this.orderedBy) - 1];

        if (!n1.object[orderedByTitle])
          return 0;


        if (this.orderedBy > 0)
          return n1.object[orderedByTitle].toString().localeCompare(n2.object[orderedByTitle].toString());
        else
          return n2.object[orderedByTitle].toString().localeCompare(n1.object[orderedByTitle].toString());
      });

    return {
      titles: initialTable.titles,
      objects: this.maxElements > 0? filteredObjects.slice(0, this.maxElements) : filteredObjects
    }

  }

  isOrderedBy(titleIndex: number): boolean {
    return Math.abs(this.orderedBy) -1 === titleIndex;
  }

  setOrderedBy(titleIndex: number): void {
    titleIndex++;
    if (this.orderedBy !== titleIndex)
      this.orderedBy = titleIndex;
    else
      this.orderedBy = -titleIndex;

  }

  setSearchFilter(value: string) {
    this.searchFilter = value;
  }

  constructor() { }

  ngOnInit() {
    this.propertiesOfObjects = this.getObjectProps();
  }

  onClick(event: any) {
    if (!this.table)
      return;
    if (!this.table.onClick)
      return;
    this.table.onClick(event);
  }

  onSearchFocused(value: boolean) {
    this.searchFocused = value;
  }

  getObjectProps() {
    if (!this.table || this.table.objects.length === 0)
      return [''];
    return this.propertiesOf(this.table.objects[0].object);
  }

  propertiesOf(obj: any) {
    return Object.keys(obj)
  }

}
