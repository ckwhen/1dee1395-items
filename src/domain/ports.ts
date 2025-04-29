import { Param } from './../domain/param';
import { Item, ItemFilter } from '../domain/item';

export interface ItemsService {
	fetchItems(filter?: ItemFilter): Promise<{
    data: Item[];
    meta: { count: number };
  }>;
}

export interface ParamsService {
	fetchParams(): Promise<{
    data: Param[];
    meta: { count: number };
  }>;
}

export interface HttpClient {
  get<T, M extends Record<string, unknown>>(
		url: string,
		filter?: unknown
	): Promise<{
    data: T;
    meta: M;
  }>
}
