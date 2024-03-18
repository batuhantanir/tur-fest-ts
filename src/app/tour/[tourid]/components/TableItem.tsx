import { FaCheck, FaTimes } from 'react-icons/fa';

interface TableItemProps {
  item: string;
  type: string;
}

const TableItem = ({ item, type }: TableItemProps) => {
  const className = 'py-3 border-b';
  return (
    <tr>
      <td className={`${className} pl-3 md:pl-10`}>{item}</td>
      {type == 'includes' ? (
        <>
          <td className={className} align="center">
            <FaCheck size={20} className="fill-green-600" />
          </td>
          <td className={className} align="center">
            {' '}
          </td>
        </>
      ) : (
        <>
          <td className={className} align="center">
            {' '}
          </td>
          <td className={className} align="center">
            <FaTimes size={20} className="fill-red-600" />
          </td>
        </>
      )}
    </tr>
  );
};

export default TableItem;
