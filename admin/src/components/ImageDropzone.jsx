import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { Box, TextField, Typography } from "@mui/material";

function ImageDropzone({ files, setFiles, imageSent, setImageSent }) {
  const imageMaxSize = 10000000; // bytes
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

          setImageSent([...imageSent, ...acceptedFiles]);
        }
      },
      accept: "image/*",
      maxSize: imageMaxSize,
      validator: nameLengthValidator,
      multiple: true,
      maxFiles: 5,
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <ul key={file.path}>
      {errors.map((e) => {
        if (e.code === "file-invalid-type") {
          return (
            <li key={e.code}>
              Type de fichier invalide. Seuls les formats de type image sont
              acceptés.
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
            <TextField {...getInputProps()} />
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
                <Typography mt="1rem">Fichiers rejetés :</Typography>
                <ul>{fileRejectionItems}</ul>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default ImageDropzone;
