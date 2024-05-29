import { ProductTypes } from "../../types/ProductTypes";
import { axiosPublic } from "../axios";

type GetProductTypes = {
  productId: string;
};

export const getProductById = async ({ productId }: GetProductTypes) => {
  try {
    return await axiosPublic
      .get<ProductTypes>(`/products/${productId}`)
      .then((r) => r.data);
  } catch (error) {
    console.error(error);
  }
};
