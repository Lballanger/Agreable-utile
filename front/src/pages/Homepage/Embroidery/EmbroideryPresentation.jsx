import useWindowSize from "../../../hooks/useWindowSize";

import Slideshow from "../../../components/SlideShow";

import broderie1 from "../../../assets/img/broderie1.webp";
import broderie2 from "../../../assets/img/broderie2.webp";
import broderie3 from "../../../assets/img/broderie3.webp";
import broderie4 from "../../../assets/img/broderie4.webp";
import broderie5 from "../../../assets/img/broderie5.webp";
import broderie6 from "../../../assets/img/broderie6.webp";
import broderie7 from "../../../assets/img/broderie7.webp";

function EmbroideryPresentation() {
  const { isMobile } = useWindowSize();

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: `${!isMobile ? "340px" : "540px"}`,
    margin: "0 1rem",
  };

  const images = [
    broderie1,
    broderie2,
    broderie3,
    broderie4,
    broderie5,
    broderie6,
    broderie7,
  ];

  return (
    <div className="main__embroidery">
      <h2>Service de broderie personnalisée</h2>
      <div className="slide-container">
        <Slideshow
          slidesToScroll={1}
          slidesToShow={4}
          infinite
          easing="linear"
          arrows={false}
          duration={0}
          transitionDuration={8000}
          data={images}
          style={divStyle}
        >
          {images.map((slideImage) => (
            <div key={slideImage}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage})`,
                  width: "95%",
                  height: `${isMobile ? "190px" : "420px"}`,
                }}
              />
            </div>
          ))}
        </Slideshow>
      </div>
    </div>
  );
}

export default EmbroideryPresentation;
