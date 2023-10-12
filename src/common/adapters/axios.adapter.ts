import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url, config);
      return data;
    } catch (error) {
      throw new Error('Error on the AxiosAdapter, check the logs...');
    }
  }
}
