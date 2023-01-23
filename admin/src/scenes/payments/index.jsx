import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { Box, useTheme } from '@mui/material';
import { findAllPayments } from "../../redux/slices/paymentsSlice";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";

function Payments() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [ page, setPage ] = useState(0);
  const [ pageSize, setPageSize ] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const { payments, isLoading, error } = useSelector((state) => state.paymentsSlice);

    useEffect(() => {
      if (!payments.length) {
        dispatch(findAllPayments({
          page,
          pageSize,
          sort: JSON.stringify(sort),
          search,
        }));
      }
    }, [page, sort, search]);

const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.1,
  },
  {
    field: "created_at",
    headerName: "Date de création",
    flex: 0.4,
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: "cost",
    headerName: "Total",
    flex: 0.3,
    renderCell: (params) => `${Number(params.value).toFixed(2)} €`,
  },
  {
    field: "currency",
    headerName: "Devise",
    flex: 0.2,
  },
  {
    field: "payment_id",
    headerName: "ID de paiement",
    flex: 0.7,
  },
  {
    field: "payment_organisation",
    headerName: "Organisme de paiement",
    flex: 0.4,
  },
  {
    field: "payment_method",
    headerName: "Méthode de paiement",
    flex: 0.4,
  },
  {
    field: "user_id",
    headerName: "ID de l'utilisateur",
    flex: 0.4,
  },
  {
    field: "temporary_user_id",
    headerName: "ID de l'utilisateur temporaire",
    flex: 0.4,
  },
  {
    field: "order_id",
    headerName: "ID de la commande",
    flex: 0.4,
  },
];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Paiements" subtitle="Retrouver ici tout les paiements" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !payments.length < 1}
          getRowId={(row) => row.id}
          rows={payments.transactions || []}
          columns={columns}
          rowCount={(payments && payments.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          localeText={{
            toolbarColumns: "Colonnes",
            toolbarDensity: "Densité",
            toolbarExport: "Exporter",
          }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
}

export default Payments;