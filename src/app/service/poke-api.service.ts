import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { pokeAPi } from '../../environments/environment';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  pageStart = 1;
  pageFinish = 15;
  // @Output() pageChange: EventEmitter<number> = new EventEmitter<any>()

  private readonly url: string = `${pokeAPi.api}/?offset=set${this.pageStart}&limit=${this.pageFinish}`;

  constructor(private http: HttpClient) { }

  get apiListAllPokemons(): Observable<any> {
    const data = this.http.get<any>(this.url)
      .pipe(
        tap(res => res),
        tap(res => {
          res.results.map((resPokemons: any) => {
            this.apiGetPokemons(resPokemons.url)
              .subscribe(
                res => resPokemons.detail = res,
              )
          });
        })
      )
    return data;
  }


  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(res => res))
  }
}
