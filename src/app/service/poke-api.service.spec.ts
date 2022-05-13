import { TestBed } from '@angular/core/testing';

import { PokeApiService } from './poke-api.service';
import { of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PokeApiService', () => {
  let service: PokeApiService;
  let httpClient: HttpClient;
  let url: string;

  const httpStub: any = {
    get: (_params: any) => of([{
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/",
      "detail": {
        "abilities": [
          {
            "ability": {
              "name": "overgrow",
              "url": "https://pokeapi.co/api/v2/ability/65/"
            },
            "is_hidden": false,
            "slot": 1
          },
          {
            "ability": {
              "name": "chlorophyll",
              "url": "https://pokeapi.co/api/v2/ability/34/"
            },
            "is_hidden": true,
            "slot": 3
          }
        ],
      }
    }])

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpStub
        }
      ]
      // imports: [
      //   HttpClientTestingModule
      // ]
    });
    service = TestBed.get(PokeApiService)
    httpClient = TestBed.get(HttpClient)
  });

  it('should be created', () => {
    // const service: PokeApiService = TestBed.get(PokeApiService);
    expect(service).toBeTruthy();
  });

  it('ele deve chamar um GET com o endpoint correto', () => {
    const spy = spyOn(httpClient, 'get').and.callThrough(); //delegando a chamada do método naturalmente
    service.apiListAllPokemons;
    expect(spy).toHaveBeenCalled();
  });

  it('ele deve chamar o endpoint', () => {
    const spy = spyOn(httpClient, 'get').and.callThrough();
    service.apiGetPokemons(url);
    expect(spy).toHaveBeenCalled();
  });
});
