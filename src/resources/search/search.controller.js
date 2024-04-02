import fetch from "node-fetch";
import { formatCategories, formatItems } from "../../utils/format.utils";

const BASE_URL = "https://api.mercadolibre.com/sites/MLA";

export const getSearchQuery = async (req, res) => {
  try {
    const { q } = req.query;

    const request = await fetch(`${BASE_URL}/search?q=${q}`);
    const response = await request.json();

    const results = {
      categories: formatCategories(response.filters),
      items: response.results.map(formatItems).slice(0, 4),
    };

    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error retrieving query information: ${error}` });
  }
};
