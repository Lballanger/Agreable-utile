import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function Slideshow({
  slidesToScroll,
  slidesToShow,
  infinite,
  easing,
  arrows,
  duration,
  transitionDuration,
  children,
  autoplay,
  canSwipe,
  pauseOnHover,
}) {
  return (
    <Slide
      slidesToScroll={slidesToScroll}
      slidesToShow={slidesToShow}
      infinite={infinite}
      easing={easing}
      arrows={arrows}
      duration={duration}
      transitionDuration={transitionDuration}
      autoplay={autoplay}
      canSwipe={canSwipe}
      pauseOnHover={pauseOnHover}
    >
      {children}
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
  children: PropTypes.node.isRequired,
  autoplay: PropTypes.bool,
  canSwipe: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
};

Slideshow.defaultProps = {
  slidesToScroll: 1,
  slidesToShow: 3,
  infinite: true,
  easing: "linear",
  arrows: false,
  duration: 0,
  transitionDuration: 0,
  autoplay: true,
  canSwipe: false,
  pauseOnHover: false,
};
