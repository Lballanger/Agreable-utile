// The function is used so that Vite can include the assets during production
const dynamicUrl = (name) => {
  return new URL(`./assets/${name}`, import.meta.url).href;
};

export default dynamicUrl;
