import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/slices/productsSlice";
import Header from "../../components/Header";
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
} from "@mui/material";

const Product = ({
  article_id,
  article_name,
  description,
  price_wt,
  rating,
  category_name,
  supply,
  stat = {},
  image,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
        <CardMedia
          sx={{ height: 180, width: "100%"}}
          image={
            new URL(
              `../../../../front/src/assets/img/shop/articles/${image[0]}.jpg`,
              import.meta.url
            ).href
          }
          title={article_name}
        />
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[600]}
          gutterBottom
        >
          {category_name}
        </Typography>
        <Typography variant="h5" component="div">
          {article_name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {Number(price_wt).toFixed(2)} €
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">
          {description.length > 120
            ? `${description.slice(0, 120)}...`
            : description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Voir plus
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <Typography>id: {article_id}</Typography>
        <Typography>Supply Left: {supply}</Typography>
        <Typography>
          Yearly Sales This Year: {stat.yearlySalesTotal || "null"}
        </Typography>
        <Typography>
          Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
        </Typography>
      </Collapse>
    </Card>
  );
};

function Products() {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(
    (state) => state.productsSlice
  );

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [products]);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Articles" subtitle="Retrouver ici l'ensemble des articles." />
      {products || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {products.map(
            ({
              article_id,
              article_name,
              description,
              price_wt,
              rating,
              category_name,
              supply,
              stat,
              image,
            }) => (
              <Product
                key={article_id}
                article_id={article_id}
                article_name={article_name}
                description={description}
                price_wt={price_wt}
                rating={rating}
                category_name={category_name}
                supply={supply}
                stat={stat}
                image={image}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}

export default Products;
