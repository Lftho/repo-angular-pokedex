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

    this.pokeApiService.apiListAllPokemons.subscribe(
      (response: any) => {
        this.setAllPokemons = response.results;
        this.getAllPokemons = this.setAllPokemons;
        this.allPokemons.push(this.setAllPokemons)

        /** -------------
         * @argument Controls
         * Controle de paginação
         * ------------- */

        let perPage = 5;
        const state = {
          page: 1,
          perPage,
          totalPokemon: this.setAllPokemons,
          totalPage: Math.ceil(this.setAllPokemons.length / perPage)
        }

        const html = {
          get(element) {
            return document.querySelector(element);
          }
        }

        const controls = {
          next() {
            state.page++;

            if (state.page > state.totalPage) {
              state.page--;
            }
          },
          prev() {
            state.page--;

            if (state.page < 1) {
              state.page++;
            }
          },
          goTo(page) {
            /** número negativo */
            if (page < 1) {
              page = 1;
            }

            state.page = page;

            if (page > state.totalPage) {
              state.page = state.totalPage
            }
          },
          createListeners() {
            html.get('.first').addEventListener('click', function () {
              controls.goTo(state.totalPage)
              update()
            });

            html.get('.last').addEventListener('click', function () {
              controls.goTo(state.totalPage)
              update()
            });

            html.get('.next').addEventListener('click', function () {
              controls.next()
              update()
            });

            html.get('.prev').addEventListener('click', function () {
              controls.prev()
              update()
            });
          }
        }

        console.log('allPokemons', this.allPokemons);
        const list = {
          create(pokemon) {

            // const div = document.createElement('div');
            // div.classList.add('pokemon');
            // div.innerHTML = this.totalPokemon;

            // html.get('.list').appendChild(div);



          },
          update() {
            // html.get('.list').innerHTML = '';

            let page = state.page - 1;
            let start = page * state.perPage;
            let end = start + state.perPage;

            const paginatedPokemons = state.totalPokemon.slice(start, end);

            paginatedPokemons.forEach(list.create);
          }
        }

        function update() {
          list.update();
          console.log(state.page)
        }

        function init() {
          list.update();
          controls.createListeners();
        }
        init();
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
}
