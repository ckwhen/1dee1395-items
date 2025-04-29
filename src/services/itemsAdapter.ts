import { httpClient } from './api';
import { ItemFilter } from '../domain/item';
import { ItemsService } from '../domain/ports';

export function createItemsAdapter(): ItemsService {
  const root = '/items';

	return {
		fetchItems: (filter?: ItemFilter) => {
			return httpClient.get(root, filter);
    },
	};
}
