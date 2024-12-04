import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { GetCountryDetailsDto } from './dto/get-country-details.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}
  @Get('available')
  async getAvailableCountries() {
    return await this.countriesService.getAvailableCountries();
  }

  @Get('details')
  async getCountryDetails(@Query() query: GetCountryDetailsDto) {
    const { countryCode, countryName } = query;
    return this.countriesService.getCountryDetails(countryCode, countryName);
  }
}
