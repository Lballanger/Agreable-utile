// The function is used so that Vite can include the assets during production
const dynamicUrl = (name) => {
  return new URL(`./src/assets/img/shop/articles/${name}`, import.meta.url);
};

export default dynamicUrl;
