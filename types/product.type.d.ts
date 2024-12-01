 interface IProduct {
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description:string;
  thumbnail: string;
  images: ["products-images-default.jpeg"];
  slugname: string;
}
 interface IProductList {
  products: IProduct[];
}
