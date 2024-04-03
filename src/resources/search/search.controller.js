import fetch from "node-fetch";
import { formatCategories, formatItems } from "../../utils/format.utils";
import { BASE_URL_API } from "../../utils/constants.utils";

export const getSearchQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    const requestUser = await fetch(`${BASE_URL_API}/users/me`, {
      headers: {
        Authorization: authorization,
      },
    });
    const responseUser = await requestUser.json();

    if (
      responseUser.status === 401 ||
      responseUser.status === 400 ||
      responseUser.status === 403
    ) {
      return res
        .status(401)
        .json({ message: "Authorization token is incorrect or outdated" });
    }

    const request = await fetch(`${BASE_URL_API}/sites/MCO/search?q=${q}`);
    const response = await request.json();

    const results = {
      author: {
        name: responseUser.first_name,
        lastName: responseUser.last_name,
      },
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
