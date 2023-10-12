import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from "../common/dto/pagination.dto";

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  private handleExceptions(error: any) {
    console.warn(error);
    if (error.code === 11000) throw new BadRequestException(`A pokemon with that key already exists: ${JSON.stringify(error.keyValue,)}`);
    throw new InternalServerErrorException(`Can't create document. Check logs...`);
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      await this.pokemonModel.create({
        ...createPokemonDto,
        name: createPokemonDto.name.toLowerCase(),
      });
      return 'Pokemon successfully created';
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const count = await this.pokemonModel.countDocuments();
    const pkmns: Pokemon[] = await this.pokemonModel.find()
                                        .limit(limit * 1)
                                        .skip((page - 1) * limit)
                                        .sort({ dexno: 1 })
                                        .select("-__v")
                                        .exec();
    return {
      page,
      total: count,
      pokemons: pkmns
    }
  }

  async findOne(term: string) {
    let pkmn: Pokemon;
    if (!isNaN(+term)) pkmn = await this.pokemonModel.findOne({ dexno: term });
    if ( !pkmn && isValidObjectId(term) ) pkmn = await this.pokemonModel.findById(term);
    if (!pkmn) pkmn = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    if (!pkmn) throw new NotFoundException(`No Pokemon found with the given mongoId, dex-number or name: [${ term }]`);
    return pkmn;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pkmn = await this.findOne(term);
    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    try {
      await pkmn.updateOne(updatePokemonDto);
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: "Pokemon updated",
        pokemon: { ...pkmn.toJSON(), ...updatePokemonDto }
      };
    } catch (error) {
      this.handleExceptions(error);
    }    
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`No Pokemon found with this mongoId: [${id}]`);
    return;
  }
}
