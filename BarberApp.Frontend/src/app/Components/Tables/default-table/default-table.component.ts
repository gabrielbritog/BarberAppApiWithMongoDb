import { AfterViewInit, ChangeDetectionStrategy, Component, Input, NgZone, OnInit, Renderer2 } from '@angular/core';
import { DefaultTable } from './default-table';

@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class DefaultTableComponent implements OnInit, AfterViewInit {

  @Input() tableTitle?: string;
  @Input() table?: DefaultTable;
  @Input() searchBar: boolean = true;
  @Input() heightAuto: boolean = false;
  @Input() customHeight?: string;
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
          const objValue = obj.object[objectProps[i]];
          if (objValue === undefined || objValue === null)
            return;
          if (objValue.toString().toLowerCase().includes(this.searchFilter.toLowerCase()) || !this.searchFilter)
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

        n1 = n1.object[orderedByTitle];
        n2 = n2.object[orderedByTitle];

        if (
          n1 === null ||
          n1 === undefined ||
          n2 === null ||
          n2 === undefined )
          return 0;

        const n1String = n1.toString();
        const n2String = n2.toString();


        if (this.orderedBy > 0){
          return n1String.localeCompare(n2String);
        }
        else{
          return n2String.localeCompare(n1String);
        }
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

  tableHeight() {
    if (this.customHeight)
      return this.customHeight;

    return this.maxElements !== 0 || this.heightAuto? 'auto' : 'calc(95vh - var(--nav-height))'
  }

  constructor(
  ) { }

  ngOnInit() {
    this.propertiesOfObjects = this.getObjectProps();
  }

  ngAfterViewInit(): void {
  }

  onClick(event: any) {
    if (!this.table)
      return;
    if (!this.table.onClick)
      return;
    this.table.onClick(event);
  }

  onClickObjectBtn(event: any) {
    if (!this.table)
      return;
    if (!this.table.onClick)
      return;

    console.log(event);
    // this.table.onClick(event);
  }

  objectHasOnClick(object: any) {
    return object.onClick? true : false;
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
