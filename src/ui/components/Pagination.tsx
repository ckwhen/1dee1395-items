import { contants } from '../../utils';
import Button from '../buttons/Button';

const { MAX_VISIBLE_PAGES, ButtonTypes } = contants;

type Props = {
  offset: number;
  limit: number;
  count: number;
  onChange: (nextOffset: number) => void;
  isDisabled?: boolean;
};

function Pagination({
  offset,
  limit,
  count,
  onChange,
  isDisabled,
}: Props) {
  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const isPaginationDisabled = isDisabled || totalPages === 0;

  const getVisiblePages = () => {
    const pages: number[] = [];

    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let endPage = startPage + MAX_VISIBLE_PAGES - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(page);
    }

    return pages;
  };

  const handleChange = (page: number) => {
    onChange((page - 1) * limit);
  };

  return (
    <div className="flex justify-end gap-2 my-4">
      <Button
        disabled={isPaginationDisabled || currentPage === 1}
        onClick={() => handleChange(currentPage - 1)}
        text="上一頁"
      />
      {getVisiblePages().map((page) => (
        <Button
          key={page}
          disabled={isPaginationDisabled}
          type={page === currentPage ? ButtonTypes.PRIMARY : ButtonTypes.DEFAULT}
          className="p-1 min-w-[38px]"
          onClick={() => handleChange(page)}
          text={page}
        />
      ))}
      <Button
        disabled={isPaginationDisabled || currentPage === totalPages}
        onClick={() => handleChange(currentPage + 1)}
        text="下一頁"
      />
    </div>
  );
}

export default Pagination;
