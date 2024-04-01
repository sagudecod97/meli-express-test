export const getDecimals = (price) => {
  return (price % 1).toFixed(2).split(".")[1];
};
