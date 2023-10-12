import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { AppConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [
    ConfigModule.forRoot({ 
      load: [AppConfiguration],
      validationSchema: JoiValidationSchema, 
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRoot(
      AppConfiguration().mongoDbUrl,
      { dbName: AppConfiguration().mongoDbName }
    ),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
