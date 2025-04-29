import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpClient } from '../domain/ports';
import { detector } from '../utils';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

class AxiosHttpClientAdapter implements HttpClient {
  constructor(private readonly instance: AxiosInstance) {}

  async get<T, M extends Record<string, unknown>>(
    url: string,
    filter?: unknown
  ): Promise<{ data: T; meta: M }> {
    const _filter = (filter ?? {}) as Record<string, unknown>;
    const config: AxiosRequestConfig = {
      params: detector.filterObject(_filter),
    };
    const { data, headers } = await this.instance.get<T>(url, config);
    const meta = {
      count: parseInt(headers['x-total-count']) || 0,
    } as unknown as M;

    return {
      data,
      meta,
    };
  }
}

export function createHttpClient(): HttpClient {
  return new AxiosHttpClientAdapter(api);
}

export const httpClient = createHttpClient();
