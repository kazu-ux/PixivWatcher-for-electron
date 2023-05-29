import { useState } from 'react';
import { BlockType } from '../../types/type';

enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
  NONE = 'none',
}

interface Column {
  id: 'id' | 'name' | 'registeredTime';
  label: string;
  sortOrder: SortOrder;
}

export default function BlockTable(props: { data: BlockType[] }) {
  const sampleUsers = [
    { id: 123, name: 'のび太', registeredTime: 10000 },
    { id: 456, name: 'ドラえもん', registeredTime: 20000 },
    { id: 111, name: 'しずか', registeredTime: 30000 },
  ];

  const [rows, setRows] = useState(props.data);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [lastClickedRowIndex, setLastClickedRowIndex] = useState<number | null>(
    null
  );
  const [columns, setColumns] = useState<Column[]>([
    { id: 'id', label: 'User ID', sortOrder: SortOrder.NONE },
    { id: 'name', label: 'User Name', sortOrder: SortOrder.NONE },
    { id: 'registeredTime', label: '登録日時', sortOrder: SortOrder.NONE },
  ]);

  const rowStyle = {
    cursor: 'pointer',
  };

  const selectedRowStyle = {
    background: 'lightblue',
    cursor: 'pointer',
  };

  const handleRowClick = (
    index: number,
    event: React.MouseEvent<HTMLTableRowElement>
  ) => {
    if (event.ctrlKey || event.metaKey) {
      // CtrlキーまたはCommandキー（Mac）が押されている場合
      if (selectedRows.includes(index)) {
        setSelectedRows(selectedRows.filter((row) => row !== index));
      } else {
        setSelectedRows([...selectedRows, index]);
      }
    } else if (event.shiftKey && lastClickedRowIndex !== null) {
      // Shiftキーが押されており、前回クリックした行が存在する場合
      const start = Math.min(index, lastClickedRowIndex);
      const end = Math.max(index, lastClickedRowIndex);
      const range = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      );
      setSelectedRows(range);
    } else {
      // 単一選択の場合
      setSelectedRows([index]);
    }

    setLastClickedRowIndex(index);
  };

  const handleHeaderClick = (columnId: 'id' | 'name' | 'registeredTime') => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        // クリックされた列のソート状態を切り替える
        let newSortOrder: SortOrder;
        if (column.sortOrder === SortOrder.ASCENDING) {
          newSortOrder = SortOrder.DESCENDING;
        } else if (column.sortOrder === SortOrder.DESCENDING) {
          newSortOrder = SortOrder.NONE;
        } else {
          newSortOrder = SortOrder.ASCENDING;
        }
        return { ...column, sortOrder: newSortOrder };
      }
      // クリックされた列以外はソート状態を保持する
      return column;
    });

    setColumns(updatedColumns);
    // ソート処理を実行する

    const sortedUsers = [...props.data]; // ソート前のデータをコピーする

    const columnToSort = updatedColumns.find(
      (column) => column.id === columnId
    );
    if (columnToSort?.sortOrder === SortOrder.ASCENDING) {
      sortedUsers.sort((a, b) => (a[columnId] > b[columnId] ? 1 : -1));
    } else if (columnToSort?.sortOrder === SortOrder.DESCENDING) {
      sortedUsers.sort((a, b) => (a[columnId] < b[columnId] ? 1 : -1));
    }

    setRows(sortedUsers);
  };
  const renderSortArrow = (column: Column): React.ReactNode => {
    if (column.sortOrder === SortOrder.ASCENDING) {
      return <span>&#9650;</span>; // ▲
    } else if (column.sortOrder === SortOrder.DESCENDING) {
      return <span>&#9660;</span>; // ▼
    } else {
      return null;
    }
  };

  return (
    <table
      border={1}
      cellSpacing={0}
      style={{
        userSelect: 'none',
        // borderCollapse: 'collapse',
        // border: '1px solid black',
      }}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.id}
              // style={cellStyle}
              onClick={() => handleHeaderClick(column.id)}
            >
              {column.label} {renderSortArrow(column)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((user, index) => (
          <tr
            key={user.id}
            style={selectedRows.includes(index) ? selectedRowStyle : rowStyle}
            onClick={(event) => handleRowClick(index, event)}
          >
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.registeredTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
