import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { GetPokemonResponse, Pokemon } from 'src/pokemon/entities/pokemon.entity';


@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  private readonly pokeAPI = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async execute() {
    const data = await this.http.get<GetPokemonResponse>(this.pokeAPI, { params: { limit: 151 } });
    const pkmns = data.results.map( ({ name, url }) => {
      const splitted = url.split('/');
      const dexno: number = parseInt(splitted[ splitted.length - 2 ]);
      return { name, dexno };
    } );

    const promises = pkmns.map( ({ name, dexno }) => this.pokemonModel.create({ name, dexno }) );
    await Promise.all(promises);
    return 'Seed executed!';
  }

  async wipeOutCollection() {
    await this.pokemonModel.deleteMany({});
  }  
}
