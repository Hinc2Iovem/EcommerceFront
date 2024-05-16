export type ProductTypes = {
  _id: string;
  title: string;
  description: string;
  rating: number;
  images: string[];
  category: string[];
  brand: string;
  userId: string;
  price: string;
  isAvailable: boolean;
  isActive: boolean;
  frontImg: string;
  amountOfReports: number;
};

export type ProductBody = {
  title: string;
  description: string;
  images: string[];
  category: string;
  brand: string;
  price: string;
  frontImg: string;
};
