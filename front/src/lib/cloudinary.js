import { Cloudinary } from "@cloudinary/url-gen";

// Create and configure your Cloudinary instance.
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

export default cloudinary;
