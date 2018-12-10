import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SortDirection } from './filter-sort/filter-sort';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'menu-filters',
  templateUrl: 'menu-filters.html',
})
export class MenuFiltersComponent implements OnInit {
  private formDefaults: FilterFormData = {
    searchBy: '',
    sort: {
      property: undefined,
      direction: SortDirection.DESC,
    },
    maxPrice: undefined,
    minLikes: undefined,
    categories: {
      mainDishes: false,
      starters: false,
      desserts: false,
      noodle: false,
      rice: false,
      curry: false,
      vegan: false,
      vegetarian: false,
      favourites: false,
    },
  };
  filtersForm: FormGroup;

  @Output('applyForm')
  applyFormEmitter: EventEmitter<FilterFormData> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Hint: formDefaults work here nicely as form builder is used and API is consistent
    // with the reset function. Please not that in case of changes in form structure this might
    // not be true anymore.
    this.filtersForm = this.fb.group(this.formDefaults);
    this.applyFilters();
  }

  applyFilters(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.applyFormEmitter.emit(this.filtersForm.value);
  }

  clearFilters(event: Event, form: FormGroup): void {
    form.reset(this.formDefaults);
    this.applyFilters(event);
  }
}

export class FilterFormData {
  searchBy: string;
  sort: { property: string; direction: string };
  maxPrice: number;
  minLikes: number;
  categories: {
    mainDishes: boolean;
    starters: boolean;
    desserts: boolean;
    noodle: boolean;
    rice: boolean;
    curry: boolean;
    vegan: boolean;
    vegetarian: boolean;
    favourites: boolean;
  };
}
