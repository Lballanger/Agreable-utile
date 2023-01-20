import React, { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  TextField,
  useMediaQuery,
  useTheme,
  Modal,
  Grid,
  Button,
  Typography,
  InputAdornment,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { updateProductById ,getCategories } from "../redux/slices/productsSlice";
import FlexBetween from "./FlexBetween";
import {
  Close,
  Delete,
  DeleteOutline,
  DeleteOutlined,
} from "@mui/icons-material";
import ImageDropzone from "./ImageDropzone";
import cloudinary from "../lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";

function EditProductModal({ open, setOpen, productDetail }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const { categories, isLoading, error } = useSelector(
    (state) => state.productsSlice
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, [categories]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (values) => {
    dispatch(updateProductById({
        id: productDetail.id,
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        categoryId: values.category,
    }));
  };

  console.log(productDetail);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme.palette.background.alt,
            boxShadow: 24,
            padding: 4,
            width: isNonMobile ? "50%" : "95%",
            height: "98vh",
            overflow: "auto",
          }}
        >
          <FlexBetween mb="1.5rem">
            <Typography variant="h3" id="modal-modal-title">
              Modifier un produit
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </FlexBetween>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={{
              name: productDetail.name,
              description: productDetail.description,
              price: productDetail.price_wt,
              quantity: productDetail.quantity,
              category: productDetail.category_id,
              tags: "",
              img: [],
            }}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid
                  width="90%"
                  margin="0 auto"
                  container
                  spacing={2}
                  sx={{
                    "& .MuiTextField-root": {
                      mt: 1,
                      mb: 1,
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    type="text"
                    label="Nom de l'article"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="name"
                    value={values.name}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Catégorie"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    multiline
                    rows={10}
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                  <FlexBetween>
                    <TextField
                      label="Prix"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                      name="price"
                      sx={{ mr: 2 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">€</InputAdornment>
                        ),
                      }}
                      error={!!touched.price && !!errors.price}
                      helperText={touched.price && errors.price}
                    />
                    <TextField
                      type="number"
                      label="Stock"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.quantity}
                      sx={{ mr: 2 }}
                      name="quantity"
                      error={!!touched.quantity && !!errors.quantity}
                      helperText={touched.quantity && errors.quantity}
                    />
                    <TextField
                      type="text"
                      label="Tags"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.tags}
                      name="tags"
                      error={!!touched.tags && !!errors.tags}
                      helperText={touched.tags && errors.tags}
                    />
                  </FlexBetween>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignContent="center"
                    m="2rem 0"
                  >
                    {productDetail.image?.map((image) => (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        pr="2rem"
                        key={image}
                      >
                        <AdvancedImage
                          cldImg={cloudinary
                            .image(image)
                            .resize(thumbnail().width(90).height(80))}
                        />
                        <Button>
                          <DeleteOutlined />
                          Supprimer
                        </Button>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="end"
                    mt="20px"
                    width="100%"
                  >
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      size="large"
                      sx={{
                        p: "0.8rem 0",
                      }}
                      fullWidth
                    >
                      Mettre à jour
                    </Button>
                  </Box>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  category: yup.number().required("required"),
  description: yup.string().required("required"),
  price: yup.number().required("required").positive(),
  quantity: yup.number().required("required"),
  tags: yup.string().required("required"),
  img: yup.array().required("required"),
});

const initialValues = {
  name: "",
  category: "",
  description: "",
  price: "",
  quantity: "",
  tags: "",
  img: [],
};

export default EditProductModal;
