import React, { useState } from 'react';
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

interface RowProps {
  user: BlockType;
  index: number;
  selectedRows: number[];
  handleRowClick: (
    index: number,
    event: React.MouseEvent<HTMLTableRowElement>
  ) => void;
}

interface HeaderProps {
  column: Column;
  handleHeaderClick: (columnId: 'id' | 'name' | 'registeredTime') => void;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  canGoPrevPage: boolean;
  canGoNextPage: boolean;
}

const Row = ({ user, index, selectedRows, handleRowClick }: RowProps) => {
  const rowStyle = {
    cursor: 'pointer',
  };

  const selectedRowStyle = {
    background: 'lightblue',
    cursor: 'pointer',
  };

  const dateTime = new Date(user.registeredTime);

  return (
    <tr
      key={user.id}
      style={selectedRows.includes(index) ? selectedRowStyle : rowStyle}
      onClick={(event) => handleRowClick(index, event)}
    >
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>
        {dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString()}
      </td>
    </tr>
  );
};

const Header = ({ column, handleHeaderClick }: HeaderProps) => {
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
    <th onClick={() => handleHeaderClick(column.id)}>
      {column.label} {renderSortArrow(column)}
    </th>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  canGoPrevPage,
  canGoNextPage,
}: PaginationProps) => {
  return (
    <div style={{ marginTop: '10px', textAlign: 'start' }}>
      <button onClick={handlePrevPage} disabled={!canGoPrevPage}>
        {'< 前へ'}
      </button>
      <span style={{ margin: '0 10px' }}>
        Page {currentPage + 1} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={!canGoNextPage}>
        {'次へ >'}
      </button>
    </div>
  );
};

const BlockTable = (props: { data: BlockType[] }) => {
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

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 10; // ページあたりの行数
  const totalPages = Math.ceil(rows.length / pageSize);

  const handleClick = (event: React.MouseEvent) => {
    const className = (event.target as HTMLElement).className;
    if (!(className === 'table_container')) return;
    setSelectedRows([]);
  };

  const handleRowClick = (
    index: number,
    event: React.MouseEvent<HTMLTableRowElement>
  ) => {
    if (event.ctrlKey || event.metaKey) {
      if (selectedRows.includes(index)) {
        setSelectedRows(selectedRows.filter((row) => row !== index));
      } else {
        setSelectedRows([...selectedRows, index]);
      }
    } else if (event.shiftKey && lastClickedRowIndex !== null) {
      const start = Math.min(index, lastClickedRowIndex);
      const end = Math.max(index, lastClickedRowIndex);
      const range = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      );
      setSelectedRows(range);
    } else {
      setSelectedRows([index]);
    }

    setLastClickedRowIndex(index);
  };

  const handleHeaderClick = (columnId: 'id' | 'name' | 'registeredTime') => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
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
      return column;
    });

    setColumns(updatedColumns);

    const sortedUsers = [...props.data];
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

  const handleDelete = () => {
    const updatedRows = rows.filter(
      (_, index) => !selectedRows.includes(index)
    );
    setRows(updatedRows);
    setSelectedRows([]);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedRows = rows.slice(startIndex, endIndex);

  const canGoPrevPage = currentPage > 0;
  const canGoNextPage = currentPage < totalPages - 1;

  return (
    <div onClick={handleClick}>
      <div className='table_container' style={{ display: 'flex' }}>
        <table
          border={1}
          cellSpacing={0}
          style={{
            userSelect: 'none',
          }}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <Header
                  key={column.id}
                  column={column}
                  handleHeaderClick={handleHeaderClick}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((user, index) => (
              <Row
                key={user.id}
                user={user}
                index={index}
                selectedRows={selectedRows}
                handleRowClick={handleRowClick}
              />
            ))}
          </tbody>
        </table>
        {selectedRows.length > 0 && (
          <div style={{ marginTop: '10px', textAlign: 'start' }}>
            <button onClick={handleDelete}>削除</button>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        canGoPrevPage={canGoPrevPage}
        canGoNextPage={canGoNextPage}
      />
    </div>
  );
};

export default BlockTable;
