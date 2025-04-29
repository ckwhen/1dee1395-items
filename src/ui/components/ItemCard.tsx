import { Item, getInStockText } from '../../domain/item';
import SwitchText from './SwitchText';

type Props = {
  data: Item,
};

function ItemCard({ data }: Props) {
  const {
    name,
    category,
    price,
    inStock,
  } = data;

  const renderLabel = (text: string) => (
    <span className="w-20 font-medium text-gray-500">
      {text}
    </span>
  );

  return (
    <div className="p-4 border rounded border-darkblue-400">
      <div className="flex">
        {renderLabel('商品名稱')}
        <span className="font-bold">{name}</span>
      </div>
      <div className="flex">
        {renderLabel('類別')}
        <span>{category}</span>
      </div>
      <div className="flex">
        {renderLabel('價格')}
        <span>${price}</span>
      </div>
      <div className="flex">
        {renderLabel('庫存')}
        <SwitchText
          isEnabled={inStock}
          text={getInStockText(inStock)}
        />
      </div>
    </div>
  );
}

export default ItemCard
