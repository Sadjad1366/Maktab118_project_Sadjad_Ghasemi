 interface IProduct  {
  "rating": {
      "rate": number,
      "count": number
  },
  "_id": string,
  "category": string,
  "subcategory": string,
  "name": "سیکو غواصی 2",
  "price": number,
  "quantity": number,
  "brand": string,
  "description": string,
  "thumbnail": string,
  "images": string[],
  "createdAt":string,
  "updatedAt": string,
  "slugname": string
}
 interface IProductList {
  products: IProduct[];
}
