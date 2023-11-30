import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MeiliSearchService} from "../../services/meili-search.service";
import {catchError, debounceTime, EMPTY, Observable, switchMap} from "rxjs";
import {MeiliSearchResponse} from "../../model/meili-search-response";
import {Household} from "../../model/household";
import {MeiliStatsComponent} from "../../components/meili-stats/meili-stats.component";
import {HouseholdCardComponent} from "../../components/household-card/household-card.component";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {Unary} from "@angular/compiler";

@Component({
  selector: 'app-household-page',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, ReactiveFormsModule, MeiliStatsComponent, HouseholdCardComponent, MatSelectModule, MatSlideToggleModule, FormsModule],
  templateUrl: './household-page.component.html',
  styleUrl: './household-page.component.scss'
})
export default class HouseholdPageComponent implements OnInit {

  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private meilisearchService: MeiliSearchService = inject(MeiliSearchService);

  enableGeoSearch = false

  form: FormGroup = this.fb.group({
    search: [],
    filter: [],
    searchableFields: [[]],
  })

  meiliSearchResponse$?: Observable<MeiliSearchResponse<Household>> = this.form.valueChanges.pipe(
    debounceTime(500),
    switchMap(({search, searchableFields, geo, filter}) =>
      this.meilisearchService.search(search, searchableFields, filter, geo).pipe(
        catchError((error: any) => {
          console.log(error);
          return EMPTY;
        })
      )
    ),

  );




  ngOnInit(): void {}

  switchGeo(change: MatSlideToggleChange) {
    console.log(change.checked);
    if (change.checked) {
      this.form.addControl('geo', this.fb.group({
        longitude: [26.11809],
        latitude: [-112.86057],
        radius: [200]
      }))
    } else {
      this.form.removeControl('geo');
    }
  }

}
