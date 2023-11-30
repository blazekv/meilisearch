import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {Household} from "../../model/household";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-household-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatTabsModule, MapComponent],
  templateUrl: './household-card.component.html',
  styleUrl: './household-card.component.scss'
})
export class HouseholdCardComponent {

  @Input({required: true}) household?: Household;
}
