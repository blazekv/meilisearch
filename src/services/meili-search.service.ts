import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MeiliSearchResponse} from "../model/meili-search-response";
import {Household} from "../model/household";

@Injectable({
  providedIn: 'root'
})
export class MeiliSearchService {

  private httpClient: HttpClient = inject(HttpClient);


  public search(searchText: string, attributesToSearchOn: string[] = [], filter: string = '', geo: {longitude: number, latitude: number, radius: number} | undefined = undefined)
  {
    const params: any = {
      q: searchText,
      limit: 5,
      attributesToSearchOn: attributesToSearchOn.length ? attributesToSearchOn : undefined,
      attributesToHighlight: attributesToSearchOn.length ? attributesToSearchOn : ['shelterStatus', 'notes', 'residenceAddress.street'],
      highlightPreTag: "<span class=\"highlight\">",
      highlightPostTag: "</span>",
      facets: ["iso3"],
      filter
    }
    if (geo) {
      params['filter'] = `_geoRadius(${geo.longitude}, ${geo.latitude}, ${geo.radius*1000})`
    }
    return this.httpClient.post<MeiliSearchResponse<Household>>('http://localhost:7700/indexes/households/search', params)
  }
}
