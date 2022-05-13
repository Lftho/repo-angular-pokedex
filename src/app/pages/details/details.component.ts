import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { pokeAPi } from 'src/environments/environment';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = `${pokeAPi.api}`;
  private urlName: string = `${pokeAPi.api}-species`;

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit() {
    this.getPokemon;
  }

  get getPokemon() {
    //recuperando o id do pokemon
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      response => {
        this.pokemon = response;
        this.isLoading = true;
      },
      error => {
        this.apiError = true;
      }
    )
  }

}
