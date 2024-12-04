import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module';
import { HttpUtilService } from './utils/http-util/http-util.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CountriesModule,
  ],
  controllers: [],
  providers: [HttpUtilService],
})
export class AppModule {}
