import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { HttpUtilService } from 'src/utils/http-util/http-util.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService, HttpUtilService],
})
export class CountriesModule {}
