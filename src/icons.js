export const pickSvgUrl = (code) => {
  let name = code.toLowerCase();
  let svgUrl;
  try {
    svgUrl =
      require(`../node_modules/cryptocurrency-icons/svg/color/${name}.svg`).default;
  } catch (e) {
    svgUrl = require(`./assets/cryptocurrency-icons/empty.svg`).default;
  }

  return svgUrl;
};
