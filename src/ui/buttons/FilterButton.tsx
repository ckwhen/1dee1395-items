import {
  IconFilter,
  IconFilterFilled,
} from '@tabler/icons-react';
import Button from './Button';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isFiltered?: boolean,
  onClick?: () => void,
}

function FilterButton({ isFiltered = false, onClick }: Props) {
  return (
    <Button
      text={isFiltered ? <IconFilterFilled /> : <IconFilter />}
      className="p-1"
      onClick={onClick}
    />
  );
};

export default FilterButton;
