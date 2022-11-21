// The function is used so that Vite can include the assets during production
const dynamicUrl = async (name) => {
  try {
    const image = await import(
      `../../assets/img/shop/articles/${name}.jpg`
    ).then((m) => m.default);

    return image;
  } catch (error) {
    console.log(error);
  }
};

export default dynamicUrl;
