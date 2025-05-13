import { useEffect, useState, useRef, useMemo } from 'react';
import { useClickAway, useWindowSize } from 'react-use';
import { Item, ItemFilter, getInStockText, getPrice } from '../domain/item';
import { Param, checkIsCategoryParam, checkIsInStockParam } from '../domain/param';
import { createItemsAdapter } from '../services/itemsAdapter';
import { createParamsAdapter } from '../services/paramsAdapter';
import { contants, detector } from '../utils';
import SearchForm, { FormData, FormOption } from '../ui/components/SearchForm';
import Table from '../ui/components/Table';
import Pagination from '../ui/components/Pagination';
import UnorderedList from '../ui/components/UnorderedList';
import ItemCard from '../ui/components/ItemCard';
import SwitchText from '../ui/components/SwitchText';
import InfiniteScroll from '../ui/components/InfiniteScroll';
import FilterButton from '../ui/buttons/FilterButton';
import PageLoadingIcon from '../ui/icons/PageLoadingIcon';

const { PAGINATION_OFFSET, PAGE_LIMIT } = contants;
const { filterObject, checkIsTablet } = detector;

const itemsAdapter = createItemsAdapter();
const parsamsAdapter = createParamsAdapter();

const sortPriceOptions = [
  { label: '由低到高', value: 'asc' },
  { label: '由高到低', value: 'desc' },
];

const itemHeaders = [
  { id: 'name', className: 'font-bold', label: '商品名稱' },
  { id: 'category', className: 'text-center', label: '類別' },
  {
    id: 'price',
    className: 'text-right',
    label: '價格',
    render: (row: Item) => getPrice(row.price),
  },
  {
    id: 'inStock',
    className: 'text-center',
    label: '庫存',
    render: ({ inStock }: Item) => (
      <SwitchText
        isEnabled={inStock}
        text={getInStockText(inStock)}
      />
    ),
  },
];

function Home() {
  const { width: windowWidth } = useWindowSize();
  const [isFilterOn, setFilterState] = useState(false);
  const [isSearchFormOpen, setSearchFormOpen] = useState(false);
  const filterRef = useRef(null);

  const [items, setItems] = useState<Item[]>([]);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [itemFilter, setItemFilter] = useState<{ [key: string]: unknown }>({});
  const [itemPager, setItemPager] = useState({
    _start: PAGINATION_OFFSET,
    _limit: PAGE_LIMIT,
  });
  const [isItemsLoading, setItemsLoading] = useState(true);

  const [categoryParams, setCategoryParams] = useState<Param[]>([]);
  const [inStockParams, setInStockParams] = useState<Param[]>([]);
  const [isParamsLoading, setParamsLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const isPageLoading = isItemsLoading || isParamsLoading;
  const isTablet = checkIsTablet(windowWidth);

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;
  
    setIsLoadingMore(true);
  
    const nextStart = items.length;
  
    try {
      const { data, meta } = await itemsAdapter.fetchItems({
        ...itemFilter,
        _start: nextStart,
        _limit: PAGE_LIMIT,
      });
  
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...data]);
      }
      setItemsCount(meta.count);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (isTablet) {
      setHasMore(true);
      setItems([]);
      setItemPager({
        _start: 0,
        _limit: PAGE_LIMIT,
      });
    }
  }, [windowWidth, isTablet]);

  useEffect(() => {
    setItemsLoading(true);
    setHasMore(true);
    itemsAdapter.fetchItems({
      ...itemFilter,
      ...itemPager,
    }).then(({ data, meta }) => {
      setItems(data);
      setItemsCount(meta.count);
    }).finally(() => {
      setItemsLoading(false);
    });
  }, [itemFilter, itemPager]);

  useEffect(() => {
    setParamsLoading(true);
    parsamsAdapter.fetchParams().then(({ data }) => {
      setCategoryParams(data.filter(checkIsCategoryParam));
      setInStockParams(data.filter(checkIsInStockParam));
    }).finally(() => {
      setParamsLoading(false);
    });
  }, []);

  useEffect(() => {
    const _filter = filterObject(itemFilter);
    const filterKeys = Object.keys(_filter).filter(
      (key) => !['_start', '_limit', '_sort', '_order'].includes(key)
    );
    const hasFilter = filterKeys.some(key => itemFilter[key]);

    setFilterState(hasFilter);
  }, [itemFilter]);

  useClickAway(filterRef, () => {
    setSearchFormOpen(false);
  });

  const handleFormOpen = () => {
    setSearchFormOpen(true);
  };

  const handleFormSubmit = ({
    name,
    minPrice,
    maxPrice,
    checkedCategories,
    inStock,
    priceOrder,
  }: FormData) => {
    setSearchFormOpen(false);
    setItemFilter(prev => {
      const filter: ItemFilter = {
        ...prev,
        inStock,
        name_like: encodeURIComponent(name),
        price_gte: minPrice !== '' ? parseInt(minPrice) : undefined,
        price_lte: maxPrice !== '' ? parseInt(maxPrice) : undefined,
        category: checkedCategories.length > 0 ? checkedCategories : undefined,
      };

      filter._sort = '';
      filter._order = '';
      if (priceOrder !== '') {
        filter._sort = 'price';
        filter._order = priceOrder;
      }

      return filter;
    });
  }
  const handleFormReset = () => {
    setSearchFormOpen(false);
    setItemFilter({
      name_like: undefined,
      price_gte: undefined,
      price_lte: undefined,
      category: undefined,
      inStock: undefined,
      _sort: '',
      _order: '',
    });
  };

  const handlePageChange = (nextOffset: number) => {
    setItemPager(prev => ({ ...prev, _start: nextOffset }));
  };

  const renderFilter = (): React.ReactNode => (
    <div className="relative" ref={filterRef}>
      <FilterButton
        isFiltered={isFilterOn}
        onClick={handleFormOpen}
      />
      {isSearchFormOpen && (
        <div className="absolute right-[0px] top-full z-1">
          <SearchForm
            categoryOptions={categoryParams as FormOption[]}
            sortPriceOptions={sortPriceOptions as FormOption[]}
            inStockOptions={inStockParams as FormOption[]}
            isDisabled={isPageLoading}
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
            initialFilter={itemFilter}
          />
        </div>
      )}
    </div>
  );

  const memoizedPagination = useMemo(() => (
    <Pagination
      offset={itemPager._start}
      limit={itemPager._limit}
      count={itemsCount}
      onChange={handlePageChange}
      isDisabled={isPageLoading}
    />
  ), [itemPager, itemsCount, isPageLoading]);

  const renderTable = (): React.ReactNode => (
    <>
      <Table<Item>
        headers={itemHeaders}
        data={items}
      />
      {memoizedPagination}
    </>
  );

  const renderList = (): React.ReactNode => (
    <InfiniteScroll
      loadMore={loadMore}
      isLoading={isLoadingMore}
      hasMore={hasMore}
    >
      <UnorderedList<Item>
        className="grid-cols-1 sm:grid-cols-2 gap-4"
        items={items}
        renderItem={item => <ItemCard data={item} />}
      />
    </InfiniteScroll>
  );

  return (
    <>
      <div className="flex items-center justify-end gap-5 mb-5">
        {isPageLoading && <PageLoadingIcon />}
        {renderFilter()}
      </div>
      {isTablet ? items.length > 0 && renderList() : renderTable()}
    </>
  )
}

export default Home
