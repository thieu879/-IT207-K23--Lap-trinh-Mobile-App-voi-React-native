export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export type ProductCardProps = {
  item: Product;
};