import TableItem from './TableItem';

interface TableProps {
  price_includes: string[];
  price_excludes: string[];
}

const Table = ({ price_includes, price_excludes }: TableProps) => {
  return (
    <table className="w-full space-x-3">
      <tr className="border rounded-sm">
        <th className="p-0.5 md:p-2 md:pl-10 pl-3 " align="left">
          Hizmet
        </th>
        <th className="p-2">Fiyat dahil</th>
        <th className="p-2">Fiyat dahil değil</th>
      </tr>
      {price_includes.map((item, index) => (
        <TableItem key={index} item={item} type="includes" />
      ))}
      {price_excludes.map((item, index) => (
        <TableItem key={index} item={item} type="excludes" />
      ))}
    </table>
  );
};

export default Table;
