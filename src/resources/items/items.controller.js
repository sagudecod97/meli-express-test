import fetch from "node-fetch";
import { getDecimals } from "../../utils/helpers.utils";
import { BASE_URL_API } from "../../utils/constants.utils";

export const getItemDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;

    const requestDetails = await fetch(`${BASE_URL_API}/items/${id}`);
    const responseDetails = await requestDetails.json();

    if (requestDetails.status === 404)
      return res.status(404).json({ message: "Id not found" });

    const requestDescription = await fetch(
      `${BASE_URL_API}/items/${id}/description`
    );
    const responseDescription = await requestDescription.json();

    const result = {
      id: responseDetails.id,
      title: responseDetails.title,
      price: {
        currency: responseDetails.currency_id,
        amount: responseDetails.price,
        decimals: getDecimals(responseDetails.price),
      },
      picture: responseDetails.pictures[0].secure_url,
      condition: responseDetails.condition,
      free_shipping: responseDetails.shipping.free_shipping,
      sold_quantity: requestDetails?.sold_quantity,
      description: responseDescription.plain_text,
    };

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error retrieving details information: ${error}` });
  }
};
