import axios, { AxiosRequestConfig } from 'axios';
import { IQuery } from '../interfaces/query';
import { API_URL } from '@/constants/API';

export class Client {
  static apiUrl = `${API_URL}/api/`;

  static async get(resource: string, params?: IQuery[] | string): Promise<any> {
    const url = this.buildUrl(resource, params);
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await axios.get<any>(url, config);
      return response.data
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private static buildUrl(resource: string, params?: IQuery[] | string): string {
    let url = `${this.apiUrl}${resource}`;

    if (typeof params === 'string') {
      url += `/${params}`;
    } else if (params) {
      url += `?${this.paramsToQuery(params)}`;
    }

    return url;
  }

  private static paramsToQuery(params: IQuery[]): string {
    return params.map(q => `${q.name}=${encodeURIComponent(q.value.toString())}`).join('&');
  }
}