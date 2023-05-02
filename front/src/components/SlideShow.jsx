import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import useWindowSize from "../hooks/useWindowSize";

import broderie1 from "../assets/img/broderie1.webp";
import broderie2 from "../assets/img/broderie2.webp";
import broderie3 from "../assets/img/broderie3.webp";
import broderie4 from "../assets/img/broderie4.webp";
import broderie5 from "../assets/img/broderie5.webp";
import broderie6 from "../assets/img/broderie6.webp";
import broderie7 from "../assets/img/broderie7.webp";

function Slideshow({
  slidesToScroll,
  slidesToShow,
  infinite,
  easing,
  arrows,
  duration,
  transitionDuration,
}) {
  const { isMobile } = useWindowSize();

  const images = [
    broderie1,
    broderie2,
    broderie3,
    broderie4,
    broderie5,
    broderie6,
    broderie7,
  ];

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: `${!isMobile ? "340px" : "540px"}`,
    margin: "0 1rem",
  };

  return (
    <Slide
      slidesToScroll={slidesToScroll}
      slidesToShow={isMobile ? slidesToShow - 1 : slidesToShow}
      infinite={infinite}
      easing={easing}
      arrows={arrows}
      duration={duration}
      transitionDuration={transitionDuration}
    >
      {images.map((slideImage) => (
        <div key={slideImage}>
          <div
            style={{
              ...divStyle,
              backgroundImage: `url(${slideImage})`,
              width: "95%",
              height: `${isMobile ? "240px" : "420px"}`,
            }}
          />
        </div>
      ))}
    </Slide>
  );
}

export default Slideshow;

Slideshow.propTypes = {
  slidesToScroll: PropTypes.number,
  slidesToShow: PropTypes.number,
  infinite: PropTypes.bool,
  easing: PropTypes.string,
  arrows: PropTypes.bool,
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
};

Slideshow.defaultProps = {
  slidesToScroll: 1,
  slidesToShow: 3,
  infinite: true,
  easing: "linear",
  arrows: false,
  duration: 0,
  transitionDuration: 8000,
};
