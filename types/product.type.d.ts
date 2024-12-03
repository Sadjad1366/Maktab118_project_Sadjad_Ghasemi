interface IProduct {
  rating: {
    rate: number;
    count: number;
  };
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  slugname: string;
}
interface ICategory {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

interface IOrder {
  "_id": string,
  "user": string,
  "products": [
      {
          "product": string,
          "count": number,
          "_id": string
      }
  ],
  "totalPrice": number,
  "deliveryDate": string,
  "deliveryStatus": true,
  "createdAt": string,
  "updatedAt": string
}
