import Slideshow from "../../../components/SlideShow";

function EmbroideryPresentation() {
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
        />
      </div>
    </div>
  );
}

export default EmbroideryPresentation;
