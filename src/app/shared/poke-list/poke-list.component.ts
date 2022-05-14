import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  private setAllPokemons: any;
  public allPokemons: Array<any[]> = []
  public getAllPokemons: any;

  constructor(
    private pokeApiService: PokeApiService,
  ) { }

  ngOnInit(): void {
    // this.onPageChange()
    this.listAllPokemon(1)
  }

  public listAllPokemon(pageno: number) {
    this.pokeApiService.apiListAllPokemons(pageno).subscribe(
      (response: any) => {
        this.setAllPokemons = response.results;
        this.getAllPokemons = this.setAllPokemons;
      }
    )
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter(
      (response: any) => {
        return !response.name.indexOf(value.toLowerCase());
      });
    this.getAllPokemons = filter;
  }

  public onPageChange(pageno: number) {
    this.listAllPokemon(pageno);
  }
}
