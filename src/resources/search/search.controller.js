import fetch from "node-fetch";
import { formatCategories, formatItems } from "../../utils/format.utils";
import { BASE_URL_API } from "../../utils/constants.utils";

export const getSearchQuery = async (req, res) => {
  try {
    const { q } = req.query;
    // const { authorization } = req.headers;

    const request = await fetch(`${BASE_URL_API}/sites/MCO/search?q=${q}`);
    const response = await request.json();

    console.log("response: ", response);

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
