import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpUtilService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, errorMessage: string): Promise<T> {
    try {
      const response = await lastValueFrom(this.httpService.get<T>(url));
      return response.data;
    } catch (error) {
      throw new HttpException(
        errorMessage || 'Failed to fetch data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async post<T>(url: string, body: any, errorMessage: string): Promise<T> {
    try {
      const response = await lastValueFrom(this.httpService.post<T>(url, body));
      return response.data;
    } catch (error) {
      throw new HttpException(
        errorMessage || 'Failed to fetch data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
