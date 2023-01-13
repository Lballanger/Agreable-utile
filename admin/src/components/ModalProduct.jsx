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
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, getCategories } from "../redux/slices/productsSlice";
import FlexBetween from "./FlexBetween";
import { Close } from "@mui/icons-material";

function ModalProduct({ open, setOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [files, setFiles] = useState([]);
  const [imageSent, setImageSent] = useState([]);

  const imageMaxSize = 10000000; // bytes
  const acceptedFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpeg"],
    "image/jpg": [".jpg"],
  };
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

  const handleFile = (e) => {
    setFiles([...imageSent, e.target.files[0]]);
  };


  const maxLength = 30;

  function nameLengthValidator(file) {
    if (file.name.length > maxLength) {
      return {
        code: "name-too-large",
        message: `Le nom du fichier est trop long. Maximum ${maxLength} caractères.`,
      };
    }

    return null;
  }

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop: (acceptedFiles, fileRejections) => {
        // Do something with the files
        if (acceptedFiles && acceptedFiles.length > 0) {
          setFiles([
            ...files,
            ...acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            ),
          ]);

          acceptedFiles.forEach((file) => {
          const reader = new FileReader();
          
          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;
            setImageSent([...imageSent, binaryStr]);
          };
          reader.readAsDataURL(file);
          });
        }
      },
      accept: acceptedFileTypes,
      maxSize: imageMaxSize,
      validator: nameLengthValidator,
      multiple: true,
      maxFiles: 5,
    });

  const handleFormSubmit = (values) => {

  const formData = new FormData();

  imageSent.forEach((image) => {
    formData.append("img", image);
  });
  formData.append("name", values.name);
  formData.append("description", values.description);
  formData.append("price", values.price);
  formData.append("categoryId", values.category);

  dispatch(createProduct(formData));
  };

  const thumbs = files.map((file) => (
    <Box key={file.path} mr="1rem">
      <Box
        sx={{
          display: "flex",
          borderRadius: 2,
          border: "1px solid #eaeaea",
          width: 100,
          height: 100,
          padding: 0.5,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: 100,
            overflow: "hidden",
          }}
        >
          <img
            src={file.preview}
            style={{
              display: "block",
              width: "100%",
              objectFit: "contain",
            }}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </Box>
      </Box>
      <Typography>{file.path}</Typography>
    </Box>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <ul key={file.path}>
      {errors.map((e) => {
        if (e.code === "file-invalid-type") {
          return (
            <li key={e.code}>
              Type de fichier invalide. Seuls les formats : .jpg, .jpeg, .png
              .gif sont acceptés.
            </li>
          );
        }
        if (e.code === "file-too-large") {
          return (
            <li key={e.code}>
              Fichier trop volumineux. Maximum{" "}
              {(imageMaxSize / 1048576).toFixed(2)} Mo.
            </li>
          );
        }
        return <li key={e.code}>{e.message}</li>;
      })}
    </ul>
  ));

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
                      value={values.stock}
                      sx={{ mr: 2 }}
                      name="stock"
                      error={!!touched.stock && !!errors.stock}
                      helperText={touched.stock && errors.stock}
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
                    {...getRootProps()}
                    style={{
                      width: "100%",
                      margin: "1rem 0",
                      border: "1px dashed #ced4d9",
                      borderRadius: "5px",
                      color: "#6c757d",
                      display: "flex",
                      minHeight: "210px",
                    }}
                  >
                    <Box display="flex" flexDirection="column" m="1rem 1.5rem">
                      {acceptedFiles.length === 0 &&
                      fileRejections.length === 0 &&
                      files.length === 0 ? (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          width="100%"
                        >
                          <TextField {...getInputProps({onChange: handleFile})} />
                          <Typography>Déposez les images ici ...</Typography>
                        </Box>
                      ) : (
                        <>
                          {files.length > 0 && (
                            <>
                              <Typography>Fichiers acceptés :</Typography>
                              <Box sx={{ display: "flex" }}>{thumbs}</Box>
                            </>
                          )}

                          {fileRejections.length > 0 && (
                            <>
                              <Typography mt="1rem">
                                Fichiers rejetés :
                              </Typography>
                              <ul>{fileRejectionItems}</ul>
                            </>
                          )}
                        </>
                      )}
                    </Box>
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
  stock: yup.number().required("required"),
  tags: yup.string().required("required"),
  img: yup.array().required("required"),
});

const initialValues = {
  name: "",
  category: "",
  description: "",
  price: "",
  stock: "",
  tags: "",
  img: [],
};

export default ModalProduct;
