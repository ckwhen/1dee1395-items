import { useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { ItemFilter } from '../../domain/item';
import { detector } from '../../utils';
import CheckboxGroup from './CheckboxGroup';

export type FormData = {
  name: string,
  minPrice: string,
  maxPrice: string,
  checkedCategories: string[],
  priceOrder: string,
  inStock?: boolean,
}
export type FormOption = {
  id: string;
  label: string;
  value: string;
};

type Props = {
  isDisabled?: boolean;
  categoryOptions: FormOption[];
  sortPriceOptions: FormOption[];
  inStockOptions: FormOption[];
  onSubmit: (data: FormData) => void;
  onReset: () => void;
  initialFilter?: ItemFilter;
};

function SearchForm({
  isDisabled,
  categoryOptions,
  sortPriceOptions,
  inStockOptions,
  onSubmit,
  onReset,
  initialFilter,
}: Props) {
  const {
    name_like,
    price_gte,
    price_lte,
    category,
    _order,
    inStock: initialInStock
  } = initialFilter ?? {};

  const [name, setName] = useState(name_like ? decodeURIComponent(name_like) : '');
  const [minPrice, setMinPrice] = useState(
    price_gte !== undefined ? price_gte.toString() : ''
  );
  const [maxPrice, setMaxPrice] = useState(
    price_lte !== undefined && price_lte !== Infinity ? price_lte.toString() : ''
  );
  const [checkedCategories, setCheckedCategories] = useState<string[]>(category || []);
  const [priceOrder, setPriceOrder] = useState(_order || '');
  const [inStock, setInStock] = useState(
    initialInStock !== undefined
      ? detector.convertBooleanToInt(initialInStock) + ''
      : ''
  );

  const handleCategoryChange = (values: string[]) => {
    setCheckedCategories(values);
  };

  const handlePriceOrderChange = (event: React.ChangeEvent) => {
    const { value } = (event.target as HTMLInputElement);

    setPriceOrder(value);
  };

  const handleInStockChange = (event: React.ChangeEvent) => {
    const { value } = (event.target as HTMLInputElement);

    setInStock(value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      minPrice,
      maxPrice,
      checkedCategories,
      priceOrder,
      inStock: inStock !== ''
        ? detector.convertIntToBoolean(parseInt(inStock)) : undefined,
    });
  }
  const handleReset = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onReset();
  }

  return (
    <form
      className={twJoin(
        'min-w-[220px] min-h-[300px] border px-3 pt-1 pb-4 mt-1 rounded-xl',
        'text-sm bg-white border-darkblue-300',
      )}
      onSubmit={handleSubmit}
    >
      <div className="my-2 text-right font-bold">
        <button
          type="submit"
          className="mr-3 cursor-pointer text-darkblue-300 hover:text-darkblue-400"
        >
          儲存
        </button>
        <button
          type="button"
          className="cursor-pointer text-darkblue-200 hover:text-darkblue-300"
          onClick={handleReset}
        >
          清除全部
        </button>
      </div>
      <div className="mb-2">
        <label htmlFor="name" className="block text-left">
          <p className="mb-1 font-medium">商品名稱:</p>
          <input
            className="w-full border px-1.5 p-1 rounded-sm border-darkblue-300"
            type="text"
            id="name"
            value={name}
            disabled={isDisabled}
            placeholder="請輸入商品名稱"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-2">
        <p className="mb-1 text-left cursor-default font-medium">類別:</p>
        <CheckboxGroup
          className="grid-cols-5 gap-2"
          options={categoryOptions}
          values={checkedCategories}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="minPrice" className="block text-left">
          <p className="mb-1 font-medium">價格:</p>
          <input
            className="w-[48%] border px-1.5 p-1 mr-[4%] rounded-sm border-darkblue-300"
            type="number"
            min={0}
            value={minPrice}
            id="minPrice"
            disabled={isDisabled}
            placeholder="最小"
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            className="w-[48%] border px-1.5 p-1 rounded-sm border-darkblue-300"
            type="number"
            min={0}
            value={maxPrice}
            disabled={isDisabled}
            placeholder="最大"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="inStock" className="block text-left w-full">
          <p className="mb-1 font-medium">庫存:</p>
          <select
            id="inStock"
            className={"w-full border px-1.5 p-1 rounded-sm border-darkblue-300"}
            value={inStock}
            onChange={handleInStockChange}
          >
            <option value="">--</option>
            {inStockOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <hr className="border-t-2 my-3 border-darkblue-100" />
      <div>
        <label htmlFor="inStock" className="block text-left w-full">
          <p className="mb-1 font-medium">價格排序:</p>
          <select
            id="priceOrder"
            className={"w-full border px-1.5 p-1 rounded-sm border-darkblue-300"}
            value={priceOrder}
            onChange={handlePriceOrderChange}
          >
            <option value="">--</option>
            {sortPriceOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  )
};

export default SearchForm
