import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  private sanitizer = inject(DomSanitizer)

  @Input({required: true}) latitude: number = 0;
  @Input({required: true}) longitude: number = 0;

  private size = 0.5;


  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${this.longitude-this.size}%2C${this.latitude-this.size}%2C${this.longitude+this.size}%2C${this.latitude+this.size}&amp;layer=mapnik&amp;marker=${this.longitude}%2C${this.latitude}`)
  }

}
