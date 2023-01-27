// modalProduct

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
import { ArrowBack, Close } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  createProduct,
  getCategories,
} from "../redux/slices/productsSlice";
import FlexBetween from "./FlexBetween";
import ImageDropzone from "./ImageDropzone";

function ModalProduct({ open, setOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  // Cloudinary
  const [files, setFiles] = useState([]);
  const [imageSent, setImageSent] = useState([]);

  // Categories data from redux
  const { categories, isLoading, error } = useSelector(
    (state) => state.productsSlice
  );

    const [isLoaded, setIsLoaded] = useState(false);

  // Fetch categories
  useEffect(() => {
    if (!categories.length && !isLoaded) {
      dispatch(getCategories());
      setIsLoaded(true);
    }
  }, [categories]);

  // Add category input
  const [addingCategory, setAddingCategory] = useState(false);

  // Modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Formik
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
                    "& label.Mui-focused": {
                      color: theme.palette.secondary.main,
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.main,
                      },
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
                    {!addingCategory &&
                      categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    <MenuItem>
                      {!addingCategory && (
                        <Button onClick={() => setAddingCategory(true)}>
                          <Typography
                            color={theme.palette.secondary[100]}
                            variant="h7"
                          >
                            {"+ Ajouter une nouvelle catégorie"}
                          </Typography>
                        </Button>
                      )}
                      {addingCategory && (
                        <Formik
                          onSubmit={(values, actions) => {
                            dispatch(
                              createCategory({ name: values.newCategory })
                            )
                              .unwrap()
                              .then(() => {
                                setAddingCategory(false);
                              })
                              .catch((err) => {
                                console.log(actions);
                                actions.setFieldError(
                                  "newCategory",
                                  "Une catégorie avec ce nom existe déjà"
                                );
                              });
                          }}
                          initialValues={{ newCategory: "" }}
                          validationSchema={yup.object().shape({
                            newCategory: yup.string().required(),
                          })}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                          }) => (
                            <form
                              onSubmit={handleSubmit}
                              style={{
                                display: "flex",
                                width: "100%",
                                flexDirection: "column",
                              }}
                            >
                              <Box>
                                <Button
                                  startIcon={<ArrowBack />}
                                  size="medium"
                                  sx={{
                                    color: theme.palette.secondary.light,
                                  }}
                                  onClick={() => setAddingCategory(false)}
                                >
                                  Retour
                                </Button>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <TextField
                                  fullWidth
                                  label="Nom de la nouvelle catégorie"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.newCategory}
                                  name="newCategory"
                                  variant="standard"
                                  error={
                                    !!touched.newCategory &&
                                    !!errors.newCategory
                                  }
                                  helperText={
                                    touched.newCategory && errors.newCategory
                                  }
                                  sx={{
                                    "& label.Mui-focused": {
                                      color: theme.palette.secondary.main,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                      "&.Mui-focused fieldset": {
                                        borderColor:
                                          theme.palette.secondary.main,
                                      },
                                    },
                                  }}
                                />
                                <Button
                                  type="submit"
                                  color="secondary"
                                  variant="text"
                                  sx={{ ml: 2 }}
                                >
                                  AJOUTER
                                </Button>
                              </Box>
                            </form>
                          )}
                        </Formik>
                      )}
                    </MenuItem>
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
  newCategory: "",
};

export default ModalProduct;
