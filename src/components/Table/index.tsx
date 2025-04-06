import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import TableHeader from "./TableHeader";

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F4F6F8",
  },
}));
// Define action type
interface TableAction {
  label: any;
  onClick: (row: any) => void;
}

// Props for the reusable table
interface ReusableTableProps {
  columns: ColumnDef<any>[];
  rowsPerPageOptions?: number[];
  onSelectRows?: (selected: any[]) => void;
  actions?: TableAction[];
  tableData: any;
  tableLoading: boolean;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  totalCount: number;
  setValues?: any;
  setParam: (param: string) => void;
  subTitle: string;
  tableError?: any;
  handleOpen?: () => void;
  enableMenu?: boolean;
  buttonText: string;
  getRowKey?: (item: any, index: number) => string;
}

function ReusableTable({
  columns,
  rowsPerPageOptions = [5, 10, 25, 50],
  onSelectRows,
  tableData,
  tableLoading,
  actions = [],
  setPageNumber,
  setPageSize,
  totalCount,
  setValues,
  setParam,
  subTitle,
  handleOpen,
  tableError,
  enableMenu = true,
  buttonText,
  getRowKey,
}: ReusableTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5); // Default rows per page
  const [loading, setLoading] = useState(true);

  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const table = useReactTable({
    data: data ?? [],
    columns: columns ?? [],
    getRowId: (row: any, index: number) => row.id || index,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, // Ensure manual pagination is enabled
    state: {
      globalFilter,
      pagination: {
        pageIndex: offset,
        pageSize: limit,
      },
    },
  });
  useEffect(() => {
    setLoading(tableLoading);
    setPageNumber(offset + 1);
    setPageSize(limit);
    setData(tableData || []);
  }, [tableData, tableLoading, offset, limit, setPageNumber, setPageSize]);

  const handleSelectRow = (id: string) => {
    const newSelected: Set<string> = new Set<string>(selectedRows);

    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }

    setSelectedRows(newSelected);
    onSelectRows?.(data.filter((row) => newSelected.has(row?.id)));
  };

  const handleSelectAll = () => {
    const newSelected =
      selectedRows?.size === data?.length
        ? new Set()
        : new Set(data.map((row) => row.sub));
    setSelectedRows(newSelected);
    onSelectRows?.(data.filter((row) => newSelected.has(row.sub)));
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
    setValues(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  const handleSearch = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      setParam(globalFilter);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <TableHeader
        title={subTitle}
        subTitle={subTitle}
        count={totalCount}
        actionText={buttonText}
        handleOpen={handleOpen}
        handleSearch={(e) => {
          handleSearch(e);
        }}
        setSearchTerm={setGlobalFilter}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedRows?.size > 0 && selectedRows?.size < data?.length
                  }
                  checked={selectedRows?.size === data?.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder ? null : (
                      <TableSortLabel
                        active={header.column.getIsSorted() !== false}
                        direction={
                          header.column.getIsSorted() === "asc" ? "asc" : "desc"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.column.columnDef.header as string}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))
              )}
              {actions.length > 0 && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableError && (
              <TableRow>
                <TableCell colSpan={(columns?.length ?? 0) + 2} align="center">
                  <Alert severity="error">{tableError?.message}</Alert>
                </TableCell>
              </TableRow>
            )}
            {loading && (
              <>
                {Array.from({ length: limit }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: columns.length + 2 }).map(
                      (__, colIndex) => (
                        <TableCell key={colIndex}>
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={20}
                          />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </>
            )}
            {table?.getRowModel()?.rows &&
            table?.getRowModel()?.rows?.length > 0 ? (
              table?.getRowModel().rows.map((row) => (
                <StyledTableRow
                  key={getRowKey?.(row, row.index) ?? `${row.index}`}
                  selected={selectedRows?.has(getRowKey?.(row, row.index) ?? `${row.index}`)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows?.has(
                        row?.original?.sub || row?.original?.id
                      )}
                      onChange={() =>
                        handleSelectRow(row?.original?.sub || row?.original?.id)
                      }
                    />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell> // Corrected line
                  ))}
                  {actions?.length > 0 && (
                    <TableCell>
                      {enableMenu ? (
                        <IconButton
                          onClick={(event) => {
                            handleMenuOpen(event, row.original);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      ) : (
                        <>
                          {actions.map((action, index) => (
                            <Button
                              variant="text"
                              size="small"
                              key={index}
                              onClick={() => action.onClick(row.original)}
                            >
                              <Typography
                                sx={{
                                  color: "#037E43",
                                  fontWeight: "600",
                                }}
                              >
                                {action.label}
                              </Typography>
                            </Button>
                          ))}
                        </>
                      )}
                    </TableCell>
                  )}
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 2} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalCount} // Total number of users from API
        rowsPerPage={limit}
        page={offset} // Convert offset to page index
        onPageChange={(_, newPage) => {
          setOffset(newPage); // Calculate new offset
        }}
        onRowsPerPageChange={(event) => {
          const newLimit = Number(event.target.value);
          setLimit(newLimit);
          setOffset(0); // Reset to first page when limit changes
        }}
      />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick(selectedRow!);
              handleMenuClose();
            }}
          >
            {action?.label}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
}

export default ReusableTable;
