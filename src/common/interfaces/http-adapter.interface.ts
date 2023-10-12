import { AxiosRequestConfig } from 'axios';

export interface HttpAdapter {
  get<T>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<T>
}
