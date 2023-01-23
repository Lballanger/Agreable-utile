// Librairies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/slices/productsSlice";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import cloudinary from "../../lib/cloudinary";

// Components
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";
import AddProductModal from "../../components/ModalProduct.jsx";
import EditProductModal from "../../components/EditProductModal";

// Material UI
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  CardMedia,
  Link,
  Badge,
} from "@mui/material";
import {
  Add,
  Delete,
  FileCopy,
  Security,
  Edit,
  Archive,
  Visibility,
} from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

// Cloudinary
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

// Utils
import formatDate from "../../utils/formatDate";

function Products() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const { products, isLoading, error } = useSelector(
    (state) => state.productsSlice
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!products.length && !isLoaded) {
      dispatch(getProducts());
      setIsLoaded(true);
    }
  }, [products]);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openEditProductModal, setOpenEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  return (
    <Box m="1.5rem 2.5rem">
      {openAddProductModal && (
        <AddProductModal
          open={openAddProductModal}
          setOpen={setOpenAddProductModal}
        />
      )}
      {openEditProductModal && (
        <EditProductModal
          open={openEditProductModal}
          setOpen={setOpenEditModal}
          productData={products.find((product) => product.id === selectedId)}
        />
      )}
      <FlexBetween>
        <Header title="Articles" />
        <Box>
          <Button
            onClick={() => setOpenAddProductModal(true)}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Add sx={{ mr: "10px" }} />
            Ajouter un article
          </Button>
        </Box>
      </FlexBetween>
      <Box
        height="100vh"
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
          loading={isLoading || !products.length}
          getRowId={(row) => row.id}
          rows={products || []}
          columns={[
            {
              field: "name",
              headerName: "NOM",
              flex: 0.8,
              renderCell: (params) => {
                return (
                  <FlexBetween>
                    <Box display="flex" alignItems="center" mr="0.7rem">
                      <AdvancedImage
                        cldImg={cloudinary
                          .image(params.row.image[0])
                          .resize(thumbnail().width(80).height(80))}
                      />
                    </Box>
                    <Box>
                      <Link
                        component={RouterLink}
                        to={`/articles/${params.id}`}
                        underline="none"
                        color="inherit"
                        fontWeight="700"
                      >
                        {params.row.name}
                      </Link>
                    </Box>
                  </FlexBetween>
                );
              },
            },
            {
              field: "category_name",
              headerName: "CATEGORIE",
              flex: 0.4,
            },
            {
              field: "price_wt",
              headerName: "PRIX",
              flex: 0.4,
              renderCell: (params) => {
                return `${params.row.price_wt} €`;
              },
            },
            {
              field: "quantity",
              headerName: "QUANTITE",
              flex: 0.4,
            },
            {
              field: "status",
              headerName: "STOCK",
              flex: 0.4,
              renderCell: (params) => {
                return (
                  <Badge
                    badgeContent={params.row.status}
                    color={params.row.quantity > 0 ? "success" : "error"}
                    overlap="rectangle"
                  />
                );
              },
            },
            {
              field: "updated_at",
              headerName: "MISE A JOUR",
              flex: 0.7,
              valueGetter: ({ value }) => formatDate(value),
            },
            {
              field: "order_id",
              headerName: "STATUS",
              flex: 0.4,
            },
            {
              field: "actions",
              type: "actions",
              flex: 0.1,
              getActions: (params) => [
                <GridActionsCellItem
                  icon={<Visibility />}
                  label="Voir"
                  onClick={() => navigate(`/articles/${params.row.id}`)}
                  showInMenu
                />,
                <GridActionsCellItem
                  icon={<Edit />}
                  label="Editer"
                  onClick={() => {
                    setOpenEditModal(true)
                    setSelectedId(params.row.id);
                  }}
                  showInMenu
                />,
                <GridActionsCellItem
                  icon={<Archive />}
                  label="Archiver"
                  onClick={() => {}}
                  showInMenu
                />,
                <GridActionsCellItem
                  icon={<Delete />}
                  label="Supprimer"
                  onClick={() => {}}
                  showInMenu
                />,
              ],
            },
          ]}
          rowCount={(products && products.id) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          rowHeight={isNonMobile ? 110 : 80}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
}

export default Products;
