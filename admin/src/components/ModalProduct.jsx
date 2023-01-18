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
import { createProduct, getCategories } from "../redux/slices/productsSlice";
import FlexBetween from "./FlexBetween";
import { Close } from "@mui/icons-material";
import ImageDropzone from "./ImageDropzone";

function ModalProduct({ open, setOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [files, setFiles] = useState([]);
  const [imageSent, setImageSent] = useState([]);

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
    const formData = new FormData();

    imageSent.forEach((image) => {
      formData.append("img", image);
    });
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("categoryId", values.category);

    dispatch(createProduct(formData));
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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
              Ajouter un produit
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </FlexBetween>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
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
                  <ImageDropzone
                    files={files}
                    setFiles={setFiles}
                    imageSent={imageSent}
                    setImageSent={setImageSent}
                  />
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
                      Ajouter l'article
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
  category: yup.string().required("required"),
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

export default ModalProduct;
