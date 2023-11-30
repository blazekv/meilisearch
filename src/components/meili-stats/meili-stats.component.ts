import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MeiliSearchResponse} from "../../model/meili-search-response";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-meili-stats',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './meili-stats.component.html',
  styleUrl: './meili-stats.component.scss'
})
export class MeiliStatsComponent {

  @Input({required: true}) response?: MeiliSearchResponse<any>;

}
