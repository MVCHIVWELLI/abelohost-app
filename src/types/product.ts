export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
