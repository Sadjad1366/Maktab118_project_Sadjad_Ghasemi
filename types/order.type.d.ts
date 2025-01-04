import {IUser} from 'user.type.ts'

interface IOrderGetAllRes {
  _id: string;
  user: string;
  products: [
    {
      product: string;
      count: number;
      _id: string;
    }
  ];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IOrderCreateReq {
  user: string;
  products: {
    product: string;
    count: number;
  }[];
  deliveryStatus: boolean;
  deliveryDate:string;
}

interface IOrderCreateRes {
  status: string;
  data: {
    order: {
      user: string;
      products: {
        product: {
          _id: string;
          price: number;
        };
        count: number;
        _id: string;
      }[];
      totalPrice: number;
      deliveryDate: string;
      deliveryStatus: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

interface IOrderById {
  status: string;
  data: {
    order: {
      _id: string;
      user: IUser;
      products: IProduct[];
      count: number;
      _id: string;
    };
    totalPrice: number;
    deliveryDate: string;
    deliveryStatus: false;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}


interface IOrderProduct {
  rating: Rating;
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
  __v: number;
  }

  interface IOrderDisplay {
  product: IOrderProduct;
  count: number;
  _id: string;
  }
