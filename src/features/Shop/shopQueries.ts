import { apiFakeStore } from "../../api/axios";

export const getAllKrogerProducts = async ({
  limit = 12,
  category,
  subCategory,
}: {
  limit: number;
  category: string;
  subCategory: string;
}) => {
  let p = `/products`;
  if (category) {
    p += `/category/${category}`;
  }
  if (subCategory) {
    p += `/subCategory/${subCategory}`;
  }
  p += `?limit=${limit}`;

  const products = await apiFakeStore.get(p);
  return products.data;
};
