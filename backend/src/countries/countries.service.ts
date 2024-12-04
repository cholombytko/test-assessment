import { Injectable } from '@nestjs/common';
import { HttpUtilService } from '../utils/http-util/http-util.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CountriesService {
  constructor(
    private readonly httpService: HttpUtilService,
    private readonly configService: ConfigService,
  ) {}

  async getAvailableCountries() {
    const getAvailableCountriesEndpoint = this.configService.get<string>(
      'GET_AVAILABLE_COUNTRIES_ENDPOINT',
    );
    return this.httpService.get(
      getAvailableCountriesEndpoint,
      'Failed to fetch available countries',
    );
  }

  async getCountryDetails(countryCode: string, countryName: string) {
    const [borderData, populationData, flagData] = await Promise.all([
      this.getCountryBorders(countryCode),
      this.getCountryPopulation(countryName),
      this.getCountryFlag(countryName),
    ]);

    return {
      borders: borderData,
      population: populationData,
      flag: flagData,
    };
  }

  private async getCountryBorders(countryCode: string) {
    const GET_COUNTRY_INFO_ENDPOINT = this.configService.get<string>(
      'GET_COUNTRY_INFO_ENDPOINT',
    );
    console.log(GET_COUNTRY_INFO_ENDPOINT);

    const url = `${GET_COUNTRY_INFO_ENDPOINT}/${countryCode}`;
    const response: any = await this.httpService.get(
      url,
      'Failed to fetch border countries',
    );
    return response.borders || [];
  }

  private async getCountryPopulation(countryName: string) {
    const GET_COUNTRY_POPULATION_ENDPOINT = this.configService.get<string>(
      'GET_COUNTRY_POPULATION_ENDPOINT',
    );
    const response: any = await this.httpService.post(
      GET_COUNTRY_POPULATION_ENDPOINT,
      { country: countryName },
      'Failed to fetch population data',
    );
    return response.data.populationCounts || [];
  }

  private async getCountryFlag(countryName: string) {
    const GET_COUNTRY_FLAG_ENDPOINT = this.configService.get<string>(
      'GET_COUNTRY_FLAG_ENDPOINT',
    );
    const response: any = await this.httpService.post(
      GET_COUNTRY_FLAG_ENDPOINT,
      { country: countryName },
      'Failed to fetch flag data',
    );
    return response.data.flag || null;
  }
}
