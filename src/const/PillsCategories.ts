export const CATEGORIES_WITHOUT_SUBCATEGORIES = {
  All: "All",
  Men: "Men",
  Women: "Women",
  Electronics: "Electronics",
};

export const CATEGORIES = {
  All: "All",
  Men: {
    Hats: "Hats",
    Shoes: "Shoes",
  },
  Women: {
    Heels: "Heels",
    Purse: "Purse",
  },
  Electronics: {
    Laptops: "Laptops",
    Smartphones: "Smartphones",
  },
};

export type CATEGORIESTYPES = typeof CATEGORIES;

export const CATEGORIES_FOR_CREATING_PRODUCTS = {
  Men: "Men",
  Women: "Women",
  Electronics: {
    Laptops: "Laptops",
    Smartphones: "Smartphones",
  },
};
