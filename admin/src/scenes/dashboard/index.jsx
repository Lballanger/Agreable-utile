import React, { useEffect } from 'react';
import FlexBetween from "../../components/FlexBetween";
import Header from '../../components/Header';
import {
  DownloadOutlined,
  PeopleAlt,
  PointOfSale,
  CalendarToday,
  TrendingUp,
} from "@mui/icons-material";
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import StatBox from "../../components/StatBox";
import OverviewChart from "../../components/OverviewChart";
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/slices/statsSlice';


const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { stats, isLoading, error } = useSelector((state) => state.statsSlice);

  useEffect(() => {
    if (!stats.dashboardData) {
      dispatch(getDashboardStats());
    }
  }, [stats.dashboardData]);


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
      flex: 0.,
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
      <FlexBetween>
        <Header title="Tableau de bord" />
        <Box>
          {/* <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Télécharger le rapport
          </Button> */}
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Nombre d'utilisateurs"
          value={stats.dashboardData?.totalCustomers || 0}
          increase="" //"+43%"
          description="Depuis le mois dernier"
          icon={
            <PeopleAlt
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Ventes d'aujourd'hui"
          value={stats.dashboardData?.dailySales || 0}
          increase="" //"+43%"
          description="Depuis le mois dernier"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          {/* <OverviewChart view="sales" isDashboard={true} /> */}
          {"Futur données de vente"}
        </Box>
        <StatBox
          title="Ventes du mois"
          value={stats.dashboardData?.monthlySales || 0}
          increase="" //"+43%"
          description="Depuis le mois dernier"
          icon={
            <CalendarToday
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Ventes de l'année"
          value={stats.dashboardData?.yearlySales || 0}
          increase="" //"+43%"
          description="Depuis le mois dernier"
          icon={
            <TrendingUp
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
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
            loading={isLoading || !stats.dashboardData}
            getRowId={(row) => row.id}
            rows={(stats.dashboardData && stats.dashboardData.payments) || []}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard