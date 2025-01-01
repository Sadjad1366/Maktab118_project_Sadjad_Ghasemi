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
  products: [
    {
      product: string;
      count: number;
    }
  ];
  deliveryStatus: boolean;
}

interface IOrderCreateRes {
      "status": string,
      "data": {
          "order": {
              "user": string,
              "products": [
                  {
                      "product": {
                          "_id": string,
                          "price": number
                      },
                      "count": number,
                      "_id": string
                  }
              ],
              "totalPrice": number,
              "deliveryDate": string,
              "deliveryStatus": boolean,
              "_id": string,
              "createdAt": string,
              "updatedAt": string,
              "__v": number
          }
      }
  }
