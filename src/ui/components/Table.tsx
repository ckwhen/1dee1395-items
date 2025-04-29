import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TableRow = {
  id: string;
  [key: string]: unknown;
};

type Props<T extends TableRow> = {
  data: T[],
  headers: {
    id: string,
    label: string,
    className?: string,
    render?: (row: T) => ReactNode,
  }[],
};

function Table<T extends TableRow>({ headers, data }: Props<T>) {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.id} className="p-3 bg-darkblue-100 text-white">
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-slate-100">
            {headers.map(({ id: headerId, className, render }) => (
              <td
                key={headerId}
                className={twMerge(
                  'border-b p-3 border-darkblue-100',
                  className
                )}
              >
                {render ? render(row): row[headerId] as ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
