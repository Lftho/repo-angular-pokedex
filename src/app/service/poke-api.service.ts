import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { pokeAPi } from '../../environments/environment';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  // pageStart = 1;
  // pageFinish = 15;
  // @Output() pageChange: EventEmitter<number> = new EventEmitter<any>()

  // private readonly url: string = `${pokeAPi.api}/?offset=set${this.pageStart}&limit=`;

  constructor(private http: HttpClient) { }

  public apiListAllPokemons(pageno: number): Observable<any> {
    const data = this.http.get<any>(
      `${pokeAPi.api}/?offset=${pageno}&limit=6`
    )
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


  /**
   * @param url
   * @returns
   * Pegando todos pokemons e passando url
   */
  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(res => res));
  }
}
