import React from "react";
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Box, Typography, Paper, Grid, useTheme } from "@mui/material";
import { AdvancedImage } from "@cloudinary/react";
import cloudinary from "../lib/cloudinary";
import { fill } from "@cloudinary/url-gen/actions/resize";

// Import the Swiper modules
SwiperCore.use([Navigation, Pagination, Thumbs]);

const ImageSlider = ({ images }) => {
  const theme = useTheme();
  const [mainSwiperRef, setMainSwiperRef] = React.useState(null);
  const [thumbsSwiperRef, setThumbsSwiperRef] = React.useState(null);

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        width: "100%",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => setMainSwiperRef(swiper)}
            thumbs={{
              swiper:
                thumbsSwiperRef && !thumbsSwiperRef.destroyed
                  ? thumbsSwiperRef
                  : null,
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Paper
                  sx={{
                    padding: "1rem",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                    color: theme.palette.text.secondary,
                    backgroundColor: "transparent",
                  }}
                >
                  <AdvancedImage
                    cldImg={cloudinary
                      .image(image)
                      .resize(
                        fill()
                        .width(450)
                        .height(450)
                      ).format("auto")
                    }
                  />
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            margin: "0 20px",
          }}
        >
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            onSwiper={(swiper) => setThumbsSwiperRef(swiper)}
            onSlideChange={() =>
              mainSwiperRef.slideTo(thumbsSwiperRef.realIndex)
            }
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <AdvancedImage
                  cldImg={cloudinary
                    .image(image)
                    .resize(fill().width(95).height(100))}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageSlider;