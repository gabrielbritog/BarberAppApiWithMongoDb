import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-SearchBar',
  templateUrl: './SearchBar.component.html',
  styleUrls: ['./SearchBar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder: string = 'Pesquisar';
  @Input() searchString: string = '';
  @Input() expanded: boolean = false;
  @Output() searchEvent = new EventEmitter<string>();
  @Output() focusEvent = new EventEmitter<boolean>();

  isFocused: boolean = false;

  get _searchString() {
    return this.searchString;
  }

  set _searchString(value: string) {
    if (value === this.searchString)
      return;
    this.searchString = value;
    this.onChange();
  }

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.searchEvent.emit(this.searchString);
  }

  changeFocus(value: boolean) {
    this.isFocused = value;

    if (!value && this.searchString !== '')
      return;
    
    this.focusEvent.emit(value);
  }

  searchButtonClick(searchBar: any) {
    
    if (this.searchString !== '') {
      this._searchString = '';
    }

    searchBar.focus();
  }

  isFocusedOrDirty() {
    return this.isFocused || this._searchString !== '';
  }

}
