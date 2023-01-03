import React, { useEffect } from 'react'
import { Box, useTheme } from '@mui/material';
import { getAllUsers } from '../../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';


function Customers() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {users, isLoading, error } = useSelector(state => state.usersSlice);
  
  useEffect(() => {
    if (!users) {
      dispatch(getAllUsers());
    }
  }, [users]);

const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.2,
  },
  {
    field: "civility",
    headerName: "Civilité",
    flex: 0.3,
  },
  {
    field: "lastname",
    headerName: "Nom",
    flex: 0.5,
  },
  {
    field: "firstname",
    headerName: "Prénom",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Téléphone",
    flex: 0.5,
  },
  {
    field: "country",
    headerName: "Pays",
    flex: 0.4,
  },
  {
    field: "date_of_birth",
    headerName: "Anniversaire",
    flex: 0.4,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
  },
];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Clients" subtitle="Liste des clients" />
      <Box
        mt="40px"
        height="75vh"
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
          loading={isLoading || !users}
          getRowId={(row) => row.id}
          rows={users || []}
          columns={columns}
          checkboxSelection={true}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default Customers;