import { Controller, Delete, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    return this.seedService.execute();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  emptyDatabase() {
    return this.seedService.wipeOutCollection();
  }
}
