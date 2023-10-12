import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ unique: true, index: true })
  dexno: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

export type FetchedPkmn = { name: string; url: string; }
export interface GetPokemonResponse {
  count: number;
  next?: string;
  previous?:  string;
  results: FetchedPkmn[];
}