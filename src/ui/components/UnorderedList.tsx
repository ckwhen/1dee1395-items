import { twMerge } from 'tailwind-merge';

type CardItem = { id: string };

type Props<T extends CardItem> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
};

function UnorderedList<T extends CardItem>({
  items,
  className,
  renderItem,
}: Props<T>) {
  return (
    <ul className={twMerge('grid', className)}>
      {items.map((item, index) => (
        <li key={item.id}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

export default UnorderedList
