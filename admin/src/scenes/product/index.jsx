import React from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductById } from "../../redux/slices/productsSlice";
import formatDate from "../../utils/formatDate";
import { AdvancedImage } from "@cloudinary/react";
import cloudinary from "../../lib/cloudinary";
import { scale, thumbnail } from "@cloudinary/url-gen/actions/resize";
import ImageSlider from "../../components/ImageSlider";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { productDetail, isLoading, error } = useSelector(
    (state) => state.productsSlice
  );

  useEffect(() => {
    if (!productDetail) {
      dispatch(getProductById(params.id));
    }
  }, [productDetail]);

  console.log(productDetail);

  return (
    <Box m="1.5rem 2.5rem">
      <Button
        startIcon={<ArrowBack />}
        size="medium"
        sx={{ color: theme.palette.secondary.light, marginBottom: "2rem" }}
        onClick={() => navigate("/articles")}
      >
        Retour à la liste des articles
      </Button>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 8"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          flex="1 1 100%"
        >
          <Box>
            <Box>
              <Box p="1.25rem 1rem">
                <Typography variant="h4">Informations</Typography>
              </Box>
            </Box>
            <Divider variant="fullWidth" />

            <Box display="flex">
              <Box display="flex" flexDirection="column" width="40%">
                <Box p="1.25rem 1rem" display="flex" alignItems="center">
                  <Typography variant="h6" minWidth="110px">
                    ID
                  </Typography>
                  <Box flex="1 1 0%">
                    <Typography
                      variant="body2"
                      color={theme.palette.secondary[200]}
                    >
                      {productDetail?.id}
                    </Typography>
                  </Box>
                </Box>

                <Box p="1.25rem 1rem" display="flex" alignItems="center">
                  <Typography variant="h6" minWidth="110px">
                    Nom
                  </Typography>
                  <Box flex="1 1 0%">
                    <Typography
                      variant="body2"
                      color={theme.palette.secondary[200]}
                    >
                      {productDetail?.name}
                    </Typography>
                  </Box>
                </Box>

                <Box p="1.25rem 1rem" display="flex" alignItems="center">
                  <Typography variant="h6" minWidth="110px">
                    Description
                  </Typography>
                  <Box flex="1 1 0%">
                    <Typography
                      variant="body2"
                      color={theme.palette.secondary[200]}
                    >
                      {productDetail?.description}
                    </Typography>
                  </Box>
                </Box>

                <Box p="1.25rem 1rem" display="flex" alignItems="center">
                  <Typography variant="h6" minWidth="110px">
                    Stock
                  </Typography>
                  <Box flex="1 1 0%">
                    <Typography
                      variant="body2"
                      color={theme.palette.secondary[200]}
                    >
                      {productDetail?.quantity}
                    </Typography>
                  </Box>
                </Box>

                <Box p="1.25rem 1rem" display="flex" alignItems="center">
                  <Typography variant="h6" minWidth="110px">
                    Prix
                  </Typography>
                  <Box flex="1 1 0%">
                    <Typography
                      variant="body2"
                      color={theme.palette.secondary[200]}
                    >
                      {productDetail?.price_wt} €
                    </Typography>
                  </Box>
                </Box>

                <Box p="1.25rem 1rem" display="flex" alignItems="center">
                  <Typography variant="h6" minWidth="110px">
                    Categorie
                  </Typography>
                  <Box flex="1 1 0%">
                    <Typography
                      variant="body2"
                      color={theme.palette.secondary[200]}
                    >
                      {productDetail?.category_name}
                    </Typography>
                  </Box>
                </Box>

                <Box p="1.25rem 1rem" display="flex" alignItems="center">
                  <Typography variant="h6" minWidth="110px">
                    Crée le
                  </Typography>
                  <Box flex="1 1 0%">
                    <Typography
                      variant="body2"
                      color={theme.palette.secondary[200]}
                    >
                      {formatDate(productDetail?.created_at)}
                    </Typography>
                  </Box>
                </Box>

                <Box p="1.25rem 1rem" display="flex" alignItems="center">
                  <Typography variant="h6" minWidth="110px">
                    Mise à jour le
                  </Typography>
                  <Box flex="1 1 0%">
                    <Typography
                      variant="body2"
                      color={theme.palette.secondary[200]}
                    >
                      {formatDate(productDetail?.updated_at)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box 
              width="60%"
              >
                {productDetail?.image && productDetail?.image.length > 0 && (
                  <ImageSlider images={productDetail?.image} />
                )}
                {/* <AdvancedImage
                  cldImg={cloudinary
                    .image(product?.image[0])
                    .resize(scale().width(300))}
                /> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
