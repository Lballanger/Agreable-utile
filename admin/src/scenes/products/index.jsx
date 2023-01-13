// Librairies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/slices/productsSlice";
import { Link as RouterLink } from "react-router-dom";

// Components
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar.jsx";
import AddProductModal from "../../components/ModalProduct.jsx";

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

function Products() {
  const dispatch = useDispatch();
  const theme = useTheme();
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

  const [open, setOpen] = useState(false);

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dcqlpb3vu",
    },
  });

  return (
    <Box m="1.5rem 2.5rem">
      {open && <AddProductModal open setOpen={setOpen} />}
      <FlexBetween>
        <Header title="Articles" />
        <Box>
          <Button
            onClick={() => setOpen(true)}
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
          getRowId={(row) => row.article_id}
          rows={products || []}
          columns={[
            {
              field: "article_name",
              headerName: "NOM",
              flex: 0.8,
              renderCell: (params) => {
                const myImage = cld
                  .image(params.row.image[0])
                  .resize(thumbnail().width(80).height(80));
                return (
                  <FlexBetween>
                    <Box display="flex" alignItems="center" mr="0.7rem">
                      <AdvancedImage cldImg={myImage} />
                    </Box>
                    <Box>
                      <Link
                        component={RouterLink}
                        to={`/articles/${params.row.article_id}`}
                        underline="none"
                        color="inherit"
                        fontWeight="700"
                      >
                        {params.row.article_name}
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
              field: "stock",
              headerName: "STATUS",
              flex: 0.4,
            },
            {
              field: "user_id",
              headerName: "MISE A JOUR",
              flex: 0.4,
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
                  onClick={() => {}}
                  showInMenu
                />,
                <GridActionsCellItem
                  icon={<Edit />}
                  label="Editer"
                  onClick={() => {}}
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
