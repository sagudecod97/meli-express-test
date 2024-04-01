import { getDecimals } from "../utils/helpers.utils";

export const formatCategories = (filtersArray) => {
  if (!filtersArray.length) return [];

  const categoriesFilters = filtersArray.find(
    (filter) => filter.id === "category"
  );

  const categories = categoriesFilters.values[0].path_from_root;

  const reducedCategories = categories.reduce((acc, currentItem) => {
    acc.push(currentItem.name);
    return acc;
  }, []);

  return reducedCategories;
};

export const formatItems = (item) => {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: getDecimals(item.price),
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.condition.free_shipping,
  };
};
