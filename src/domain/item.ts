import { UniqueId } from '../shared-kernel';

export type ItemName = string;

type ItemInStock = boolean;

export type Item = {
	id: UniqueId;
	name: ItemName;
	category: string;
	price: number;
	inStock: ItemInStock;
};

export type ItemFilter = {
  name_like?: ItemName;
	price_gte?: number;
	price_lte?: number;
  category?: string[];
  inStock?: ItemInStock;
	_sort?: string;
	_order?: string;
	_start?: number;
	_limit?: number;
}

export const getInStockText = (inStock: ItemInStock) => (
	inStock ? '有庫存' : '無庫存'
);

export const getPrice = (price: number) => `$${price}`;
