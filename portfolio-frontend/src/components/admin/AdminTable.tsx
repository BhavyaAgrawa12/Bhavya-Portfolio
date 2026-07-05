import type { ReactNode } from 'react';

interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  width?: string;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
}

export default function AdminTable<T>({ columns, data, keyExtractor, emptyMessage = 'No entries yet.' }: Props<T>) {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] ${col.width ?? ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-[var(--color-text-secondary)]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/3"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 align-middle">
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
