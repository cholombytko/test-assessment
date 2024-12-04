import { IsNotEmpty, IsString } from 'class-validator';

export class GetCountryDetailsDto {
  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  countryName: string;
}
